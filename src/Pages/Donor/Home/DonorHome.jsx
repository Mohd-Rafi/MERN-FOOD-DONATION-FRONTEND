import React, { useEffect, useState } from 'react';
import { getLoggedInId } from '../../../../utils/index';
import NavDonor from '../../../Components/NavDonor/NavDonor';
import customAxios from '../../../../utils/customAxios';

import './DonorHome.css';
import { useNavigate } from 'react-router-dom';
const DonorHome = () => {
  const [data, setData] = useState([]);
  const [listing, setListings] = useState([]);
  const navigate = useNavigate();
  const getAvatar = async () => {
    const response = await customAxios.get(`/donor/profile/${getLoggedInId()}`);
    setData(response.data);
  };
  const getYourLisings = async () => {
    const response = await customAxios.get(`/listing/${getLoggedInId()}`);
    setListings(response.data);
    // console.log(response.data);
  };
  const onClickCard = id => {
    navigate(`/donor/listingDetails/${id}`);
  };
  useEffect(() => {
    getAvatar();
    getYourLisings();
  }, []);
  return (
    <div className="donor-home-main">
      <NavDonor />
      <p className="hea">Welcome {data.name}</p>;
      <div className="donor-home-main-donor-listings">
        <p className="header">Your Listings..</p>
        {listing.length > 0 ? (
          <div className="listing-container-home">
            {listing.map(item => {
              return (
                <div
                  className={`listing-card ${
                    item.status == 'BOOKED' ? 'card-booked' : ''
                  }`}
                  key={item._id}
                  onClick={() => onClickCard(item._id)}
                >
                  <img src={item.images[0]} alt="Loading" />
                  <p className="itemname">{item.name}</p>
                  <div className="listing-card-loc-category">
                    <p className="itemloc">Location: {item.location}</p>
                    <p
                      className={`itemcat ${
                        item.category == 'Veg' ? 'item-veg' : ''
                      }`}
                    >
                      {item.category}
                    </p>
                  </div>

                  <p>Status : {item.status}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <p>You dont have any ongoing donations</p>
        )}
      </div>
    </div>
  );
};

export default DonorHome;
