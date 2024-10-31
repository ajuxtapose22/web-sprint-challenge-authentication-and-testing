import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import JokesList from './components/JokesList';

function App() {
  const [token , setToken] = useState('');

  return (
    <Router>
      <div className="App">
        <h1>Authentification</h1>
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/jokes">Jokes</Link>
          </li>
        </ul>
        <Route path="/login" render={(props) => <Login {...props} setToken={setToken} />} />
        <Route path="/register" component={Register} />
        <Route path="/jokes" render={(props) => <JokesList {...props} token={token} />} />
      </div>
    </Router>
  )

}

export default App;