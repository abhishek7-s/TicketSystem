import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './navbar.scss'

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav >
      <div>
        <h2>BookNow.com</h2>
      </div>
      <div className='links'>
        <Link to="/">Home</Link>
        {user ? (
          <>
            {user.isAdmin && <Link to="/admin">Admin Panel</Link>}
            <Link to="/myBookings">My Bookings</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
