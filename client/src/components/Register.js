import React, { useState } from 'react';

const Register = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || data.error || 'Registration failed');
        return;
      }

      setSuccess('Registration successful! You can now log in.');
      setUsername('');
      setPassword('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.log(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Register</h2>
      <form
        onSubmit={handleRegister}
        className="d-flex flex-column align-items-center mt-3"
        style={{ maxWidth: '300px', margin: '0 auto' }}
      >
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Username"
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
        <button className="btn btn-success w-100">Register</button>
        {error && <p className="text-danger mt-2">{error}</p>}
        {success && <p className="text-success mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default Register;
