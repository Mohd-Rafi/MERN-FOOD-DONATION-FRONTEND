import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
// import img6 from '../../../../public/img6.png';
import Oauth from '../../../Components/Oath/Oauth';
import customAxios from '../../../../utils/customAxios';
import ClipLoader from 'react-spinners/ClipLoader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
import { Zoom } from 'react-awesome-reveal';

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
      const response = await customAxios.post('/user/login', data);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      toast.success('Login successfull, Welcome back user', {
        onClose: () => {
          navigate('/user/home');
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
  return (
    <div className="user-sign-up-main">
      <ToastContainer />
      <div className="user-sign-up-main-card">
        <img src={'/img6.png'} alt="not loaded" />
        <div className="user-sign-up-main-card-contents">
          <h1>User Login</h1>

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
          {/* <Oauth /> */}
          <span>
            New User.?
            <Link className="log" to="/user/sign-up">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
