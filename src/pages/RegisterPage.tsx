import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';

// Define User interface
interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  // State variables for form inputs
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  // Handle form submission for registering a new user
  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create a new user object with a unique ID
    const newUser: User = {
      id: new Date().toISOString(),
      username,
      email,
      password,
    };

    // Get existing users from localStorage or initialize to an empty array
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const isEmailTaken = existingUsers.some(user => user.email === email);

    if (isEmailTaken) {
      alert('Email is already taken.');
      return;
    }

    // Add the new user to the existing users and update localStorage
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Registration successful!');
    navigate('/login'); // Redirect to login page after registration
  };

  return (
    <div className="addUser">
      <h3>Sign Up</h3>
      <form className="addUserForm" onSubmit={handleRegister}>
        <div className="inputGroup">
          <label htmlFor="name">Username:</label>
          <input
            type="text"
            id="name"
            name="name"
            autoComplete="off"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success">
            Sign Up
          </button>
        </div>
      </form>
      <div className="login">
        <p>Already have an Account?</p>
        <Link to="/login" className="btn btn-primary">
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
