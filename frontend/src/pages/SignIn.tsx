import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './scss/form.scss'

const Signin: React.FC = () => {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signin(email, password);
    navigate('/');
  };

  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <h2>Signin</h2>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signin</button>
      </form>
    </div>
  );
};

export default Signin;
