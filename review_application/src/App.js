import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { authentication } from './firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Login from './Login';
import Navbar from './Navbar';
import Home from './components/Home';
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
      <Navbar/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/book-reviews" 
            element={<Menu title="The Bookery" user={user} onLogout={handleLogout} />}
          />
          <Route 
            path="/login" 
            element={<Login onLogin={() => setIsLoggedIn(true)} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
