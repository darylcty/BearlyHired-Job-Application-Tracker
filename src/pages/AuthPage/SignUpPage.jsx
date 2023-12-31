import { useState } from "react";
import { signUp } from "../../utils/users-service";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";

export default function SignUpPage({ setUser }) {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirm: "",
        secret: "",
		error: "",
	});

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const showAdminField = params.get("admin") === "true";
    //? function to validate email using regex
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

	const navigate = useNavigate();

	const handleChange = (event) => {
        const { name, value } = event.target;
        let errorValue = formData.error;
        if (name === "email" && !isValidEmail(value)) {
            errorValue = "Email is invalid";
            } else if (name === "email") {
                errorValue = "";
            }
        setFormData({...formData, [name]:value, error: errorValue});
    }

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const user = await signUp(formData);
			setUser(user);
			navigate("/");
		} catch (error) {
			setFormData((prevData) => ({...prevData, error: "Sign up Failed - Try again" }));
		}
    };

	const disable = formData.password !== formData.confirm;

    return (
        <Card style={{ marginTop: "70px", marginBottom: "50px"}}>
            <Container>
            <h1>Ready to Join Our Sleuth?</h1>
            <Row>
                <Col md={6}>
                <div className="form-container">
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label style={{ display: "inline" }}>Email</Form.Label>
                        <p style={{ display: "inline", color: "red", marginLeft: "20px" }} className="error-message">&nbsp;{formData.error}</p>
                        <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                        type="password"
                        name="confirm"
                        value={formData.confirm}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    {showAdminField && (
                        <Form.Group>
                        <Form.Label>do u know the sekret?(｡◕‿‿◕｡)</Form.Label>
                        <Form.Control
                        type="password"
                        name="secret"
                        value={formData.secret}
                        onChange={handleChange}
                        />
                    </Form.Group>
                    )}
                    <br></br>
                    <Button type="submit" disabled={disable}>
                        SIGN UP
                    </Button>
                    </Form>
                </div>
                </Col>
            </Row>
            <Row>
            <Col md={6}>
            <br/>
            <div className="register-link">
                Already one of us? Click here to <Link to="/login">login!</Link>
            </div>
            <br/>
            </Col>
        </Row>
            </Container>
            </Card>
        );
}
