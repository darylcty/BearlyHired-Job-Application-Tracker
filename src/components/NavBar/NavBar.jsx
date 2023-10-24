import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import * as usersService from "../../utils/users-service";

export default function NavBar({user, setUser}) {
    console.log("NavBar user: ", user);

    const navigate = useNavigate();

    function handleLogOut() {
        usersService.logOut();
        setUser(null);
    }
    return (
        <nav>
            {user ? (
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Link to="/">
						<img
                        src="https://i.imgur.com/oXRXyHi.png"
						width="auto"
						height="75"
						style={{ marginRight: "20px" }}
						/>
					</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
						<Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
							<Navbar.Collapse>
								<Navbar.Text>Welcome back, {user.name}!</Navbar.Text>
							</Navbar.Collapse>
								<NavDropdown
                                title="Your Jobs"
                                id="basic-nav-dropdown"
                                style={{ marginRight: "30px" }}>
									<NavDropdown.Item onClick={() => navigate("/jobs")}>
										Job Applications
									</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate("/interviews")}>
										Interviews
									</NavDropdown.Item>
									<NavDropdown.Item onClick={() => navigate("/offers")}>
										Offers
									</NavDropdown.Item>
									</NavDropdown>
								<NavDropdown title="Your Dashboard" id="basic-nav-dropdown">
									<NavDropdown.Item onClick={() => navigate("/dashboard")}>
										Your Dashboard
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										onClick={() => {
											navigate("/");
											handleLogOut();
										}}>
										Sign Out
									</NavDropdown.Item>
								</NavDropdown>
						</Navbar.Collapse>
					</Container>
				</Navbar>
            ) : (
                <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
					<Container>
						<Navbar.Brand className="logo"
							onClick={() => navigate(`/`)} aria-controls="basic-navbar-nav">
								<img
								src="https://i.imgur.com/oXRXyHi.png"
								width="auto"
								height="75"
								style={{ marginRight: "20px" }}
								/>
						</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" className="ml-auto"/>
						<Navbar.Collapse id="basic-navbar-nav" className="ml-auto">
							<Nav>
								<Nav.Link onClick={() => navigate("/login")}>Log In</Nav.Link>
								<Button onClick={() => navigate("/signup")} variant="success" style={{ marginLeft: "20px"}}>Sign Up</Button>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
            )}
        </nav>
        );
    }