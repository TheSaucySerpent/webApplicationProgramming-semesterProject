import React, { useState } from 'react';
import { authentication } from './firebaseConfig';
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
      <h1 className="text-center mb-4">{isRegistering ? 'Create Account' : 'Login'}</h1>

      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}  

      <Form onSubmit={handleSubmit}>
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

        <Form.Group className="mb-3" controlID="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter Email" 
            value={email} 
            onChange={(event) => setEmail(event.target.value)} 
            required>
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3" controlID="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required>
          </Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="w-100">
          {isRegistering ? "Register" : "Login"}
        </Button>
      </Form>

      <Col className="d-flex justify-content-center gap-2 mt-3">
        <Button variant="success" onClick={() => {
          setIsRegistering(!isRegistering);
          setErrorMessage('');
        }}>
          {isRegistering ? "I already have an account" : "Register"}
        </Button>

        <Button variant="primary" onClick={() => {
          props.onLogin();
          setErrorMessage('');
          navigate('/book-reviews');
        }}>
          Continue Without Login
        </Button>
      </Col>
    </Container>
  );
};

export default Login;
