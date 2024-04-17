import React from 'react';
import './oauth.css';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from './firebase';
import customAxios from '../../../utils/customAxios';
const Oauth = () => {
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const response = await customAxios.post('/donor/google', {
        name: result.user.displayName,
        email: result.user.email,
        image: result.user.photoURL,
      });
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      navigate('/donor/home');
    } catch (e) {
      console.log('Could not sign in with google', e);
    }
  };
  return (
    <button className="g-auth-btn" onClick={handleGoogleClick}>
      Login with google
    </button>
  );
};

export default Oauth;
