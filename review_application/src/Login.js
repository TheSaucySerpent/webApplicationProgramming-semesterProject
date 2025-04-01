import React, { useState } from 'react';
import { authentication } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event) {
    event.preventDefault(); // prevent default form submission behavior
    try {
      if (isRegistering) {
        // create a new user with the email and password
        await createUserWithEmailAndPassword(authentication, email, password);
      }
      else {
        // sign in the established user
        await signInWithEmailAndPassword(authentication, email, password);
      }
      props.onLogin()
    }
    catch(error) {
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
    <div>
      <h1>{isRegistering ? 'Create Account' : 'Login'}</h1>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
      </form>
      <button type="toggle-is-registering" onClick={() => {
        setIsRegistering(!isRegistering);
        setErrorMessage(''); // clear error message when switching modes
      }}>
        {isRegistering ? 'I already have an account' : 'Register'}
      </button>
      <button type="continue-without-login" onClick={() => {
        props.onLogin(); // act like the user has just logged in
        setErrorMessage(''); // clear error message when bypassing login
      }}>
        Continue Without Login
      </button>
    </div>
  );
};

export default Login;
