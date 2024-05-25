import React, { useEffect, useState } from 'react';
import './YourBookings.css';
import NavUser from '../../../Components/NavUser/NavUser';
import customAxios from '../../../../utils/customAxios';
import { getLoggedInId } from '../../../../utils';
import { useNavigate } from 'react-router-dom';
const YourBookings = () => {
  const [donations, setDonations] = useState([]);

  const getDonationsDetails = async () => {
    const response = await customAxios.get(`/order/listing/${getLoggedInId()}`);
    setDonations(response.data);
  };
  console.log(donations);

  const navigate = useNavigate();

  const onClickCard = id => {
    navigate(`/user/your-bookings/details/${id}`);
  };

  useEffect(() => {
    getDonationsDetails();
  }, []);
  return (
    <div className="your-bookings-main">
      <NavUser />
      <div className="your-bookings-main-container">
        <div className="your-bookings-main-container-your-items">
          {donations.length > 0 ? (
            donations.map(item => (
              <div
                className="listing-card"
                key={item._id}
                onClick={() => onClickCard(item._id)}
              >
                <div className="list-card-img">
                  <img src={item.listing.images[0]} alt="Loading" />
                </div>

                <div className="item-card-contents">
                  <p className="itemname">{item.listing.name}</p>
                  <div className="listing-card-loc-category">
                    <p className="itemloc">Location: {item.listing.location}</p>
                    <p
                      className={`itemcat ${
                        item.listing.category == 'Veg' ? 'item-veg' : ''
                      }`}
                    >
                      {item.listing.category}
                    </p>
                  </div>
                  <div className="listing-card-time">
                    <p>Date: {item.listing.date}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="endP">You dont have any booking items</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourBookings;
