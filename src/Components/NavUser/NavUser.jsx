import React, { useEffect, useState } from 'react';
import './NavUser.css';
import { NavLink } from 'react-router-dom';
import customAxios from '../../../utils/customAxios';
import { getLoggedInId } from '../../../utils';
const NavUser = ({ setDonations }) => {
  const [user, setUser] = useState({ image: '' });
  // const [donations, setDonations] = useState([]);

  const getUserDetails = async () => {
    const response = await customAxios.get(`/user/${getLoggedInId()}`);
    setUser(response.data);
  };

  const onChangeSearchBar = async e => {
    try {
      const response = await customAxios.get(
        `/listing/search/loc?location=${e.target.value}`
      );
      setDonations(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };
  // console.log(user);
  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="navUser-main">
      <div className="navUser-main-cont-left">
        <img src="/logo2.png" alt="" />
      </div>
      <div className="search-bar">
        <input
          type="text"
          onChange={onChangeSearchBar}
          placeholder="Search locations"
        />
      </div>
      <div className="navUser-main-cont-right">
        <NavLink className="NavLink" to={'/user/home'}>
          Home
        </NavLink>
        <NavLink className="NavLink" to={'/user/favorites'}>
          Favorites
        </NavLink>
        <NavLink className="NavLink" to={'/user/your-bookings'}>
          Your Bookings
        </NavLink>
        <NavLink className="NavLink" to={'/user/login'}>
          Logout
        </NavLink>
        <img src={user.image} alt="" />
      </div>
    </div>
  );
};

export default NavUser;
