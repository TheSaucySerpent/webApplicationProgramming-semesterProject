import React, { useState } from 'react';
import { authentication } from '../firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Alert} from 'react-bootstrap';

const Login = (props) => {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault(); // prevent default form submission behavior (page reload)
    try {
      if (isRegistering) {
        // create a new user with the email and password
        const userCredential = await createUserWithEmailAndPassword(authentication, email, password);
        // update the user's display name
        await updateProfile(userCredential.user, {
          displayName: displayName
        });
      } 
      else {
        // sign in the established user
        await signInWithEmailAndPassword(authentication, email, password);
      }
      props.onLogin(); // call onLogin prop
      navigate('/book-reviews'); // navigate to /book-reviews after login
    } 
    catch (error) {
      // handle Firebase authentication errors
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already in use. Please log in instead.');
      } else if (error.code === 'auth/invalid-credential') {
        setErrorMessage('Invalid email or password. Please try again or register.');
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage('Incorrect password. Please try again.');
      } else {
        setErrorMessage(error.message); // fallback error message
      }
    }
  }

  return (
    <Container fluid className="d-flex flex-column justify-content-center align-items-center">
      <Row className="mb-2 text-center">
        <h1>{isRegistering ? 'Create Account' : 'Login'}</h1>
      </Row>

      <Row>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
      </Row>  

      <Form onSubmit={handleSubmit}>
        <Row>
          {isRegistering && (
            <Form.Group className="mb-3">
              <Form.Label>Display Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Display Name"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                required>
              </Form.Control>
            </Form.Group>
          )}
        </Row>
        
        <Row>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter Email" 
              value={email} 
              onChange={(event) => setEmail(event.target.value)} 
              required>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required>
            </Form.Control>
          </Form.Group>
        </Row>

        <Row className='mb-3'>
          <Col className='d-flex justify-content-center align-items-center'>
            <Button type="submit" variant="primary">
              {isRegistering ? "Register" : "Login"}
            </Button>
          </Col>
        </Row>
      </Form>

      <Row>
        <Col xs={12} md={6} className="mb-3 d-flex justify-content-center">
          <Button variant="primary" className="d-flex justify-content-center align-items-center" onClick={() => {
            setIsRegistering(!isRegistering);
            setErrorMessage('');
          }}>
            {isRegistering ? "I already have an account" : "Register"}
          </Button>
        </Col>

        <Col xs={12} md={6} className="mb-3 d-flex justify-content-center">
          <Button variant="primary" className="d-flex justify-content-center align-items-center" onClick={() => {
            props.onLogin();
            setErrorMessage('');
            navigate('/book-reviews');
          }}>
            Continue Without Login
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
