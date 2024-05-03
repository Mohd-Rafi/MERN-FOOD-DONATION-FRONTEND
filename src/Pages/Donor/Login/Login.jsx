import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
// import img6 from '../../../../public/img6.png';
import customAxios from '../../../../utils/customAxios';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { Zoom } from 'react-awesome-reveal';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import generator from 'generate-password-ts';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  let [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
  };

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await customAxios.post('/donor/login', data);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      toast.success('Login successfull, Welcome back user', {
        onClose: () => {
          navigate('/donor/home');
        },
        autoClose: 1000,
        position: 'bottom-center',
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast.error('Email or password incorrect', {
        position: 'bottom-center',
      });
    }
  };

  const onGoogleLoginClick = async credentialResponse => {
    try {
      const credentialResponseDecoded = jwtDecode(
        credentialResponse.credential
      );
      console.log(credentialResponseDecoded);
      const response = await customAxios.post('/donor/google', {
        name: credentialResponseDecoded.name,
        email: credentialResponseDecoded.email,
        image: credentialResponseDecoded.picture,
        password: generator.generate({
          length: 10,
          numbers: true,
        }),
      });
      if (response) {
        localStorage.setItem('token', response.data.token);
      }
      toast.success('Login successfull', {
        onClose: () => {
          navigate('/donor/home');
        },
        autoClose: 1000,
        position: 'bottom-center',
      });
    } catch (error) {
      toast.error('Login Failed', {
        position: 'bottom-center',
      });
    }
  };
  return (
    <div className="donor-sign-up-main">
      <ToastContainer />
      <FontAwesomeIcon
        icon={faCircleChevronLeft}
        size="3x"
        className="back-btn"
        onClick={() => {
          navigate('/login-selector');
        }}
      />
      <div className="donor-sign-up-main-card">
        <img src={'/img6.png'} alt="not loaded" />
        <div className="donor-sign-up-main-card-contents">
          <h1>Donor Login</h1>

          <input
            type="text"
            placeholder="Email"
            onChange={e => onChange(e, 'email')}
          />
          <input
            type="text"
            placeholder="Password"
            onChange={e => onChange(e, 'password')}
          />

          <button onClick={onClick} className="signup-btn">
            {loading ? (
              <ClipLoader
                color={'white'}
                loading={loading}
                size={16}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              'Login'
            )}
          </button>
          <GoogleLogin
            onSuccess={onGoogleLoginClick}
            onError={() => {
              console.log('Login Failed');
            }}
          />
          <span>
            New User.?
            <Link className="log" to="/donor/sign-up">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
