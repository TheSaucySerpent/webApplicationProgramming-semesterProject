import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { authentication } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Home from './Home';
import Login from './Login';
import Navbar from './Navbar';
import Menu from './components/Menu'

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
      if (currentUser) {
        setIsLoggedIn(true);
        setUser(currentUser); // set user to the currently authenticated user
      } else {
        setIsLoggedIn(false);
        setUser(null); // reset user state when not logged in
      }
    });

    return () => unsubscribe(); // cleanup subscription on unmount
  }, []);

  async function handleLogout() {
    await signOut(authentication);
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/book-reviews" 
            element={isLoggedIn ? <Menu title="The Bookery" user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/book-reviews" /> : <Login onLogin={() => setIsLoggedIn(true)} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
