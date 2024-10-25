import React from 'react';
import { Link } from 'react-router-dom';
import VideoBackground from '../components/VideoBackground';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-container">
      <VideoBackground />
      <div className="home-content">
        <h1>Bienvenue sur CineApp !</h1>
        <div className="home-buttons">
          <Link to="/login" className="home-button">
            Login
          </Link>
          <Link to="/register" className="home-button">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
