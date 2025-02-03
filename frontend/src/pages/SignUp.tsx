import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './scss/form.scss'

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(name, email, password);
    navigate('/');
  };

  return (
    <div className='main'>
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
