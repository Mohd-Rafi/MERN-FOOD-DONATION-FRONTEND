import React from 'react';
import './NavUser.css';
import { NavLink } from 'react-router-dom';
const NavUser = () => {
  return (
    <div className="navUser-main">
      <div className="navUser-main-cont-left"></div>
      <div className="navUser-main-cont-right">
        <NavLink className="NavLink" to={'/user/home'}>
          Home
        </NavLink>
        <NavLink className="NavLink" to={'/user/login'}>
          Logout
        </NavLink>
      </div>
    </div>
  );
};

export default NavUser;
