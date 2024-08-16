import React, { useEffect, useState } from 'react';
import { getLoggedInId } from '../../../../utils/index';
import NavDonor from '../../../Components/NavDonor/NavDonor';
import customAxios from '../../../../utils/customAxios';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import './DonorHome.css';
import { useNavigate } from 'react-router-dom';
const DonorHome = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

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

  const onChangeSearchBar = async e => {
    try {
      const response = await customAxios.get(
        `/listing/search/item?title=${
          e.target.value
        }&donorId=${getLoggedInId()}`
      );
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  useEffect(() => {
    getAvatar();
    getYourLisings();
  }, []);
  return (
    <div className="donor-home-main">
      <NavDonor />
      <p className="hea">Welcome {data.name}</p>;
      <div className="search-bar">
        <input
          type="text"
          onChange={onChangeSearchBar}
          placeholder="Search donations"
        />
      </div>
      <div className="donor-home-main-donor-listings">
        <p className="header">Your Listings..</p>
        {listing.length > 0 ? (
          <div className="listing-container-home">
            <Carousel
              responsive={responsive}
              autoPlay={true}
              swipeable={false}
              draggable={false}
              // // showDots={true}
              infinite={false}
              // partialVisible={false}
              // dotListClass="custom-dot-list-style"
            >
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
            </Carousel>
          </div>
        ) : (
          <p>You dont have any ongoing donations</p>
        )}
      </div>
    </div>
  );
};

export default DonorHome;
