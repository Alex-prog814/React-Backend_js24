import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';

const Login = () => {
  const navigate = useNavigate();

  const { handleLogin, error, setError } = useContext(authContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleAuth(){
    let formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    handleLogin(formData, email, navigate);
  };

  useEffect(() => {
    setError(false);
  }, []);

  return (
    <div>
      <h2>Login User</h2>
      {error ? <h3>{error}</h3> : null}

      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />

      <input type="text" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />

      <button onClick={handleAuth}>Login</button>
    </div>
  )
};

export default Login;