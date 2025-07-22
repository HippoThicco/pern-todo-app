import React, { useState } from 'react';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || 'Login failed');
        return;
      }

      setUser(data);
      alert(`Welcome, ${data.username}!`);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.log(err.messsage);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form
        onSubmit={handleLogin}
        className="d-flex flex-column align-items-center mt-3"
        style={{ maxWidth: '300px', margin: '0 auto' }}
      >
        <input
          type="text"
          className="form-control mb-2"
          placeHolder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          className="form-control mb-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-100">Login</button>
        {error && <p className="text-danger mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
