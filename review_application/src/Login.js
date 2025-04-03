import React, { useState } from 'react';
import { authentication } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
    <div id="login-page">
      <h1>{isRegistering ? 'Create Account' : 'Login'}</h1>
      {errorMessage ? <p>{errorMessage}</p> : null}
      <form onSubmit={handleSubmit} className='login-form'>
        {isRegistering && (
          <input
            type="text"
            placeholder="Display Name"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            required
          />
        )}
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
      <div className='toolbar'>
        <button type="button" onClick={() => {
          setIsRegistering(!isRegistering);
          setErrorMessage(''); // Clear error message when switching modes
        }}>
          {isRegistering ? 'I already have an account' : 'Register'}
        </button>
        <button type="button" onClick={() => {
          props.onLogin(); // Act like the user has just logged in
          setErrorMessage(''); // Clear error message when bypassing login
          navigate('/book-reviews'); // Navigate to /book-reviews
        }}>
          Continue Without Login
        </button>
      </div>
    </div>
  );
};

export default Login;
