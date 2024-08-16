import React, { useEffect, useState } from 'react';
import customAxios from '../../../../utils/customAxios';
import { getLoggedInId } from '../../../../utils';
import NavUser from '../../../Components/NavUser/NavUser';
import { useNavigate } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState([]);
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  const getUserDetails = async () => {
    const response = await customAxios.get(`/user/${getLoggedInId()}`);
    setUser(response.data);
  };
  const getDonationsDetails = async () => {
    const response = await customAxios.get('/listing');
    setDonations(response.data);
  };

  console.log(donations);

  const onClickCard = id => {
    navigate(`/user/donationDetails/${id}`);
  };

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

  useEffect(() => {
    getUserDetails();
    getDonationsDetails();
  }, []);
  return (
    <div className="user-home-main">
      <NavUser setDonations={setDonations} />
      <div className="user-home-main-heading">
        <p>
          Welcome <span>{user.name}</span>
        </p>
      </div>
      <div className="user-home-main-main-container">
        <h2>Orders available</h2>
        <h3>Veg</h3>
        <div className="user-home-main-main-container-donations">
          {donations.filter(item => {
            return item.status == 'FREE' && item.category[0] == 'Veg';
          }).length > 0 ? (
            <Carousel
              responsive={responsive}
              // autoPlay={true}
            >
              {donations
                .filter(
                  item => item.status == 'FREE' && item.category[0] == 'Veg'
                )
                .map(item => {
                  return (
                    <div
                      className="listing-card"
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
                      {/* <div className="listing-card-time">
                        <p>Date: {item.date}</p>
                      </div> */}
                      <p className="stats">Status : {item.status}</p>
                    </div>
                  );
                })}
            </Carousel>
          ) : (
            //
            <p className="p-isEmpty">
              Donations are not available right now..try later
            </p>
          )}
        </div>
        <h3>Non Veg</h3>
        <div className="user-home-main-main-container-donations">
          {donations.filter(item => {
            return item.status == 'FREE' && item.category[0] == 'Non Veg';
          }).length > 0 ? (
            <Carousel
              responsive={responsive}
              // autoPlay={true}
            >
              {donations
                .filter(
                  item => item.status == 'FREE' && item.category[0] == 'Non Veg'
                )
                .map(item => {
                  return (
                    <div
                      className="listing-card"
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
                      {/* <div className="listing-card-time">
                        <p>Date: {item.date}</p>
                      </div> */}
                      <p className="stats">Status : {item.status}</p>
                    </div>
                  );
                })}
            </Carousel>
          ) : (
            //
            <p className="p-isEmpty">
              Donations are not available right now..try later
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
