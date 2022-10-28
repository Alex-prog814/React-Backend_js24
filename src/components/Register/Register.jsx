import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { authContext } from '../../contexts/authContext';
import Loader from '../Loader/Loader';

const Register = () => {
  const { handleRegister, error, setError, loading } = useContext(authContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  function handleSave(){
    if(!email.trim() || !password.trim() || !passwordConfirm.trim()){
      alert('Some inputs are empty!');
      return;
    } else {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password_confirm", passwordConfirm);
      handleRegister(formData, navigate);
    };
  };

  useEffect(() => {
    setError(false);
  }, []);

  if(loading){
    return <Loader />;
  };

  return (
    <div>
      <h2>Register User</h2>
      {error ? <h3>{error}</h3> : null}

      <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <input type="text" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

      <input type="text" value={passwordConfirm} placeholder="Password confiramtion" onChange={(e) => setPasswordConfirm(e.target.value)} />

      <button onClick={handleSave}>Register</button>
    </div>
  )
}

export default Register