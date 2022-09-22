import { useEffect, useState } from "react";
import { addUser } from "../firebase/functions";
import { useNavigate } from "react-router";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
const CryptoJS = require("crypto-js");

export default function About() {
  const [redirect, setRedirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (redirect) navigate("/login");
  }, [redirect, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Stops page refresh

    let password = event.target.elements.password.value;

    var encryptedPass = CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(password),
      "AIzaSyC4QmDmwTtyi0WQoLB"
    ).toString();

    let data = {
      email: event.target.elements.email.value,
      password: encryptedPass,
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      officeLocation: event.target.elements.officeLocation.value,
      role: event.target.elements.role.value,
      hobbies: event.target.elements.hobbies.value,
      currentSkills: event.target.elements.currentSkills.value,
      desiredSkills: event.target.elements.desiredSkills.value,
      degree: event.target.elements.degree.value,
      bio: event.target.elements.bio.value,
      linkedin: event.target.elements.linkedin.value,
    };
    console.log("data2submit", data);
    addUser(data).then((res) => setRedirect(res));
  };
  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col>
          <h1>Register</h1>
          <p>Join RSG Bridge today, just fill in this form.</p>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="email" md="12" lg="6">
                <Form.Label>Email *</Form.Label>
                <Form.Control type="email" name="email" required />
              </Form.Group>

              <Form.Group as={Col} controlId="password" md="12" lg="6">
                <Form.Label>Password *</Form.Label>
                <Form.Control type="password" name="password" required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="firstName"
                md="12"
                lg="6"
              >
                <Form.Label>First Name *</Form.Label>
                <Form.Control name="firstName" required />
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                controlId="lastName"
                md="12"
                lg="6"
              >
                <Form.Label>Surname *</Form.Label>
                <Form.Control name="lastName" required />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="officeLocation" md="12" lg="4">
                <Form.Label>Location</Form.Label>
                <Form.Select
                  defaultValue="Select your location..."
                  name="officeLocation"
                  required
                >
                  <option value="Bishopsgate">Bishopsgate</option>
                  <option value="Cardiff">Cardiff</option>
                  <option value="Leeds">Leeds</option>
                  <option value="Nottingham">Nottingham</option>
                  <option value="Sutton">Sutton</option>
                  <option value="Southampton">Southampton</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="role" md="12" lg="4">
                <Form.Label>Role</Form.Label>
                <Form.Select defaultValue="Choose your role..." name="role">
                  <option value="Data Science">Data Science</option>
                  <option value="Product">Product</option>
                  <option value="Tech">Tech</option>
                  <option value="UX">UX</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="degree" md="12" lg="4">
                <Form.Label>
                  Degree <span className="text-muted">(optional)</span>
                </Form.Label>
                <Form.Control type="text" name="degree" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="hobbies" md="12" lg="4">
                <Form.Label>
                  Hobbies <span className="text-muted">(comma separated)</span>
                </Form.Label>
                <Form.Control type="text" name="hobbies" />
              </Form.Group>

              <Form.Group as={Col} controlId="skills" md="12" lg="4">
                <Form.Label>
                  Skills <span className="text-muted">(comma separated)</span>
                </Form.Label>
                <Form.Control type="text" name="currentSkills" />
              </Form.Group>

              <Form.Group as={Col} controlId="desiredSkills" md="12" lg="4">
                <Form.Label>
                  Desired Skills{" "}
                  <span className="text-muted">(comma separated)</span>
                </Form.Label>
                <Form.Control type="text" name="desiredSkills" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="bio" md="12" lg="8">
                <Form.Label>
                  Enter a short bio{" "}
                  <span className="text-muted">(optional)</span>
                </Form.Label>
                <Form.Control as="textarea" rows={3} name="bio" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="linkedin"
                md="12"
                lg="6"
              >
                <Form.Label>
                  Linked In Profile URL{" "}
                  <span className="text-muted">(optional)</span>
                </Form.Label>
                <Form.Control name="linkedin" />
              </Form.Group>
            </Row>

            <Button variant="primary" type="submit">
              Register
            </Button>

            <Form.Group className="mt-5">
              <a href="/Login">Back to login page</a>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
