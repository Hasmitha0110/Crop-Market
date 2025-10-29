import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h1>Welcome to Crop Market</h1>
      <button style={{ margin: '10px', padding: '10px 30px', fontSize: '18px' }} onClick={() => navigate('/login')}>
        Login
      </button>
      <button style={{ margin: '10px', padding: '10px 30px', fontSize: '18px' }} onClick={() => navigate('/signup')}>
        Signup
      </button>
    </div>
  );
};

export default Home;
