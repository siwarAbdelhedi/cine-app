import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';


const Navbar: React.FC = () => {
  // const navigate = useNavigate();

  // Handle user logout by removing the user from localStorage
  // const handleLogout = () => {
  //   localStorage.removeItem('userLoggedIn');
  //   navigate('/login');
  // };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          CineApp
        </Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/movies">Movies</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* <li>
          <button onClick={handleLogout} className="btn btn-logout">
            Logout
          </button>
        </li> */} 
      </ul>
    </nav>
  );
};

export default Navbar;
