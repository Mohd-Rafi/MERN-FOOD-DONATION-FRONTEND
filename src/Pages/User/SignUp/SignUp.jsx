import React, { useState } from 'react';
import './SignUp.css';
import { Link, useNavigate } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

// import img6 from '../../../../public/img6.png';

import customAxios from '../../../../utils/customAxios';
const SignUp = () => {
  const [data, setData] = useState({
    name: '',
    image: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  //   const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onUpload = e => {
    if (e.file && e.file.response) {
      setData({ ...data, image: e.file.response.url });
    }
  };

  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
    console.log(data);
  };
  // console.log(data);
  const onClick = async () => {
    try {
      const response = await customAxios.post('/user/signup', data);
      navigate('/user/login');
    } catch (error) {
      console.log(error);
    }
  };
  s;
  return (
    <div className="user-sign-up-main">
      <div className="user-sign-up-main-card">
        <img src={'/img6.png'} alt="not loaded" />
        <div className="user-sign-up-main-card-contents">
          <h1>User SignUp</h1>
          <input
            type="text"
            placeholder="User name"
            onChange={e => onChange(e, 'name')}
          />
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
          <input
            type="text"
            placeholder="Confirm Password"
            onChange={e => onChange(e, 'confirmpassword')}
          />
          <Upload
            name="file"
            action="http://localhost:3000/upload/image"
            onChange={onUpload}
          >
            <Button className="upload-btn" icon={<UploadOutlined />}>
              Upload Image
            </Button>
          </Upload>
          <button onClick={onClick} className="signup-btn">
            Sign Up
          </button>
          <span>
            Already registerd
            <Link className="log" to="/user/login">
              Login
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
