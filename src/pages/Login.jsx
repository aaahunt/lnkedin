import React, { useEffect, useState } from "react";
import { checkLogin } from "../firebase/functions";
import { setCookie } from "../functions/cookies";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

function Login() {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCookie("user", "", -999); // clear logged in cookie
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log("not valid?");
      setValidated(false);
    }

    let email = event.target.elements.email.value;
    let pass = event.target.elements.password.value;

    // Find user login info
    checkLogin(email, pass).then((userData) => {
      if (userData) {
        setValidated(true);
        setCookie("user", userData.id, 3);
        window.location.replace("/home");
      } else {
        setValidated(false);
        setError(true);
      }
    });
  };

  return (
    <Container className="login justify-content-md-center">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="pb-3"
          >
            <section className="logo">
              <h1 className="mb-3">RSG Bridge</h1>
            </section>
            <h1 className="mb-3">Login</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
                isInvalid={validated}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                isInvalid={error}
                required
              />
              <Form.Control.Feedback type="invalid">
                Incorrect username or password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <a href="/Register">Register now</a>
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
