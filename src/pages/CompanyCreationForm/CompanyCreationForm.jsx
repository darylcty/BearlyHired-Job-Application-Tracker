import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { createCompany } from "../../utils/companies-service";
import CreateCompanyModal from "../../components/Modal/CreateCompanyModal";

export default function CompanyCreationForm() {
    const [companyData, setCompanyData] = useState({
		companyName: "",
		companyAddress: "",
		country: "",
        industry: "",
	});
	const navigate = useNavigate();

    const handleChange = (event) => {
        setCompanyData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    };

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const company = await createCompany(companyData);
			setCompanyData(company);
			navigate("/create-company");
            setModalShow(true);
		} catch (error) {
			setCompanyData((prevData) => ({...prevData, error: "Creation Failed - Try again" }));
		}
        //? Reset from to default after submission
        setCompanyData({ companyName: "", companyAddress: "", country: "", industry: "default"})
    };

    const disable = (!companyData.companyName || !companyData.companyAddress || !companyData.country || !companyData.industry);

    const [ modalShow, setModalShow ] = useState(false);

    function closeModal() {
        setModalShow(false);
    }

    return (
        <>
            <CreateCompanyModal show={modalShow} onHide={closeModal}  />
            <Container className="company-creation-page">
            <h1>Company Creation Page</h1>
            <Row>
                <Col md={6}>
                <div className="form-container">
                    <Form autoComplete="off" onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Company Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="companyName"
                        value={companyData.companyName}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Company Address</Form.Label>
                        <Form.Control
                        type="text"
                        name="companyAddress"
                        value={companyData.companyAddress}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Country</Form.Label>
                        <Form.Control
                        type="text"
                        name="country"
                        value={companyData.country}
                        onChange={handleChange}
                        required
                        />
                    </Form.Group>
                    <br></br>
                    <Form.Label>Industry</Form.Label>
                    <Form.Select aria-label="industry" name="industry" onChange={handleChange} required defaultValue={"Select Industry"}>
                        <option>Select Industry</option>
                        <option value="Education">Education</option>
                        <option value="Health Services">Health Services</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Retail">Retail</option>
                        <option value="Financial Services">Financial Services</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Construction">Construction</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                    </Form.Select>
                    <br></br>
                    <Button type="submit" disabled={disable}>
                        Create Company
                    </Button>
                    </Form>
                </div>
                </Col>
            </Row>
            <Row>
        </Row>
            </Container>
    </>
    )
}