import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  // State variables for form inputs
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  // Handle form submission for logging in
  const handleLogin = (event: React.FormEvent<HTMLFormElement>):void => {
    event.preventDefault();

    // Get existing users from localStorage or initialize to an empty array
    const existingUsers: User[]= JSON.parse(localStorage.getItem('users') || '[]') as User[];
    const user = existingUsers.find(user => user.email === email && user.password === password);

    if (!user) {
      alert('Invalid email or password.');
      return;
    }

    // Save logged-in user information to localStorage
    localStorage.setItem('userLoggedIn', JSON.stringify(user));
    alert('Login successful!');
    navigate('/movies'); // Redirect to movies page after login
  };

  return (
    <div className="addUser">
      <h3>Sign In</h3>
      <form className="addUserForm" onSubmit={handleLogin}>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
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
            placeholder="Enter your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
      </form>
      <div className="login">
        <p>Don't have an account?</p>
        <Link to="/register" className="btn btn-success">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
