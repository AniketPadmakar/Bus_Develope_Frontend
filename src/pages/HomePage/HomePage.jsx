import React from 'react';
import { Link } from 'react-router-dom';
import StyleHomepage from './StyleHomepage';

const Home = () => {
  return (
    <StyleHomepage>
      <div className='hm-body'>
        <div className="home-container">
          <h1>Welcome to Bus Booking</h1>
          <div className="module-container">
            <div className="module">
              <h2>User</h2>
              <Link to="/user-signin">Signin</Link>
              <Link to="/user-signup">Signup</Link>
            </div>
            <div className="module">
              <h2>Admin</h2>
              <Link to="/admin-signin">Signin</Link>
              <Link to="/admin-signup">Signup</Link>
            </div>
          </div>
        </div>
      </div>
    </StyleHomepage>
  );
}

export default Home;
