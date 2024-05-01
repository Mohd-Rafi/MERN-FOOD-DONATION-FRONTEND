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
import UserLogin from './Pages/User/Login/Login';
import USerSignUp from './Pages/User/SignUp/SignUp';
import UserHome from './Pages/User/Home/Home';
import DonationDetails from './Pages/User/DonationDetails/DonationDetails';
import YourBookingsPage from './Pages/User/YourBookingsPage/YourBookings';
import YourBookingDetailsPage from './Pages/User/YourBookingDetailsPage/YourBookingDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainHome />} />
      <Route path="/login-selector" element={<LoginSelector />} />
      <Route path="/donor/sign-up" element={<DonorSignUp />} />
      <Route path="/donor/login" element={<DonorLogin />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/sign-up" element={<USerSignUp />} />

      <Route element={<PrivateRoute role="DONOR" path="/donor/login" />}>
        <Route path="/donor/home" element={<DonorHome />} />
        <Route path="/donor/listing" element={<AddListing />} />
        <Route path="/donor/listingDetails/:id" element={<ListingDetails />} />
      </Route>

      <Route element={<PrivateRoute role="USER" path="/user/login" />}>
        <Route path="/user/home" element={<UserHome />} />
        <Route path="/user/donationDetails/:id" element={<DonationDetails />} />
        <Route path="/user/your-bookings" element={<YourBookingsPage />} />
        <Route
          path="/user/your-bookings/details/:id"
          element={<YourBookingDetailsPage />}
        />
        /user/your-bookings/details
        {/* <Route path="/donor/listing" element={<AddListing />} /> */}
        {/* <Route path="/donor/listingDetails/:id" element={<ListingDetails />} /> */}
      </Route>
    </Routes>
  );
};

export default App;
