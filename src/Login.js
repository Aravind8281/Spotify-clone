// Login.js
import React from 'react';
import styled from 'styled-components';
import { LoginUrl } from './Spotify';
const Login = () => {
  const handleLoginClick = () => {
    window.location.href = LoginUrl;
  };

  return (
    <Container>
      <img
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="Spotify"
      />
      <button onClick={handleLoginClick}>Click me</button>
    </Container>
  );
};

export default Login;

const Container=styled.div`
  display:flex;
  flex-direction:column;
  align-items: center;
  justify-content:center;
  height:100vh;
  width;100vh;
  background-color:black;
  button{
    padding: 1rem 5rem;
    border-radius: 5rem;
    border:none;
    background-color:#1db954;
    font-size:1.4rem;
    cursor:pointer
  }
`;