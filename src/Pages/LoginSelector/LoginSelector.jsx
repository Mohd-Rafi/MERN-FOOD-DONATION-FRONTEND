import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSelector.css';
import { Fade } from 'react-awesome-reveal';
const LoginSelector = () => {
  const navigate = useNavigate();
  return (
    <div className="login-selector-main">
      <h1>How do you want to login..?</h1>
      <img src="img2.png" alt="" className="image" />
      <div className="login-selector-main-container">
        <Fade direction="right">
          <div
            className="login-selector-main-container-donor"
            onClick={() => {
              navigate('/user/login');
            }}
          >
            <span className="login-selector-main-reciver">
              I want to recieve items
            </span>
          </div>
          <div
            className="login-selector-main-container-reciever"
            onClick={() => {
              navigate('/donor/login');
            }}
          >
            <span className="login-selector-main-donor">
              I want to donate items
            </span>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default LoginSelector;
