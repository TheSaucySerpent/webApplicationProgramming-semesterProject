import React, { useState } from 'react';
import { authentication } from './firebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

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
      console.log("Error with Sign in", error);
    }
  }

  return (
    <div>
      <h1>{isRegistering ? 'Create Account' : 'Login'}</h1>
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
      }}>
        {isRegistering ? 'I already have an account' : 'Register'}
      </button>
    </div>
  );
};

export default Login;
