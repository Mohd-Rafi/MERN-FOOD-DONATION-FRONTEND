// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //   apiKey: import.meta.env.FIRE_BASE_API,
  apiKey: 'AIzaSyCDJ7kjJUiUHatU7Di4GMXVcc8nVdTrvc0',
  authDomain: 'food-donation-mern.firebaseapp.com',
  projectId: 'food-donation-mern',
  storageBucket: 'food-donation-mern.appspot.com',
  messagingSenderId: '500614703262',
  appId: '1:500614703262:web:9154383c38ef8ec160b38f',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
