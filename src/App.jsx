import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import MainHome from './Pages/MainHome/MainHome';
import LoginSelector from './Pages/LoginSelector/LoginSelector';
import DonorSignUp from './Pages/Donor/SignUp/SignUp';
import DonorLogin from './Pages/Donor/Login/Login';
import DonorHome from './Pages/Donor/Home/DonorHome';
import AddListing from './Pages/Donor/AddListing/AddListing';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import ListingDetails from './Pages/Donor/ListingDetails/ListingDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainHome />} />
      <Route path="/login-selector" element={<LoginSelector />} />
      <Route path="/donor/sign-up" element={<DonorSignUp />} />
      <Route path="/donor/login" element={<DonorLogin />} />

      <Route element={<PrivateRoute role="DONOR" path="/donor/login" />}>
        <Route path="/donor/home" element={<DonorHome />} />
        <Route path="/donor/listing" element={<AddListing />} />
        <Route path="/donor/listingDetails/:id" element={<ListingDetails />} />
      </Route>
    </Routes>
  );
};

export default App;
