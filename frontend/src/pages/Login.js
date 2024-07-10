import React from 'react';

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Redirect to Google OAuth
    window.location.href = 'http://localhost:4000/auth/google?prompt=consent';
  };

  return (
    <div>
      <button onClick={handleSubmit}>Login with Google</button>
    </div>
  );
};

export default Login;
