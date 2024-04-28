import React, { useEffect, useState } from 'react';
import './Home.css';
import customAxios from '../../../../utils/customAxios';
import { getLoggedInId } from '../../../../utils';
import NavUser from '../../../Components/NavUser/NavUser';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState([]);
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  const getUserDetails = async () => {
    const response = await customAxios.get(`/user/${getLoggedInId()}`);
    console.log(response.data);
    setUser(response.data);
  };
  const getDonationsDetails = async () => {
    const response = await customAxios.get('/listing');
    setDonations(response.data);
  };
  // console.log(user);
  // console.log(donations);

  const onClickCard = id => {
    navigate(`/user/donationDetails/${id}`);
  };
  useEffect(() => {
    getUserDetails();
    getDonationsDetails();
  }, []);
  return (
    <div className="user-home-main">
      <NavUser />
      <div className="user-home-main-main-container">
        <h2>Orders available</h2>
        <div className="user-home-main-main-container-donations">
          {donations.map(item => (
            <div
              className="listing-card"
              key={item._id}
              onClick={() => onClickCard(item._id)}
            >
              <img src={item.images[0]} alt="Loading" />
              <p className="itemname">{item.name}</p>
              <div className="listing-card-loc-category">
                <p className="itemloc">Location: {item.location}</p>
                <p className="itemcat">Category: {item.category}</p>
              </div>
              <div className="listing-card-time">
                <p>Start Time: {item.startTime}</p>
                <p>End Time: {item.endTime}</p>
              </div>
              <p>Status : {item.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
