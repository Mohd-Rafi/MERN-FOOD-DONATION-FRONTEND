import React, { useEffect, useState } from 'react';
import './DonationDetails.css';
import { useNavigate, useParams } from 'react-router-dom';
import NavUser from '../../../Components/NavUser/NavUser';
import customAxios from '../../../../utils/customAxios';
import { Carousel, ConfigProvider, Radio } from 'antd';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import moment from 'moment';
import { getLoggedInId } from '../../../../utils';
import { Button, Modal } from 'antd';

const DonationDetails = () => {
  const [donations, setDonations] = useState({ images: [], donor: '' });
  const navigate = useNavigate();
  const { id } = useParams();

  const getDonationsDetails = async () => {
    const response = await customAxios.get(`/listing/donation/details/${id}`);
    setDonations(response.data);
  };

  // const [yourListing, setYourListing] = useState({user:''});
  // const getYourDonationsDetails = async () => {
  //   const response = await customAxios.get(`/order/${id}`);
  //   setYourListing(response.data[0]);
  // };

  // const onBookItem = async () => {
  //   const response = await customAxios.post('/order', {
  //     donor: donations.donor._id,
  //     user: getLoggedInId(),
  //     listing: id,
  //   });
  //   navigate('/user/home');
  // };

  const onChange = currentSlide => {
    // console.log(currentSlide);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const response = await customAxios.post('/order', {
      donor: donations.donor._id,
      user: getLoggedInId(),
      listing: id,
    });
    setIsModalOpen(false);
    // navigate('/user/home');
    getDonationsDetails();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getDonationsDetails();
    // getYourDonationsDetails();
  }, []);
  return (
    <div className="donationDetails-main">
      <NavUser />
      <div className="donationDetails-main-container">
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Do you want to book this listing..?</p>
        </Modal>
        <div className="donationDetails-main-container-image">
          <ConfigProvider
            theme={{
              components: {
                Carousel: {
                  dotHeight: 8,
                  dotActiveWidth: 30,
                },
              },
              token: {
                colorBgContainer: 'white',
              },
            }}
          >
            <Carousel
              afterChange={onChange}
              autoplay
              speed="500"
              infinite
              dotPosition="top"
              className="car"
            >
              <img src={donations.images[0]} alt="" />
              <img src={donations.images[1]} alt="" />
              <img src={donations.images[2]} alt="" />
            </Carousel>
          </ConfigProvider>
        </div>

        <div className="listing-details-main-container-items">
          <div
            className={
              donations.category == 'Veg'
                ? 'items-list-item-name itemcategoryVeg'
                : 'items-list-item-name itemcategoryNonVeg'
            }
          >
            <p>{donations.category}</p>
          </div>
          <div className="items-list-item-name">
            <span>Item name: </span>
            <p>{donations.name}</p>
          </div>
          <div className="items-list-item-name">
            <span>Item description: </span>
            <p>{donations.description}</p>
          </div>

          <div className="items-list-item-name">
            <span>Item Count: </span>
            <p>{donations.headCount}</p>
          </div>
          <div className="items-list-item-name">
            <span>Item Status: </span>
            <p>{donations.status}</p>
          </div>
          <div className="blabla">
            <div className="items-list-item-name">
              <span> Start at: </span>
              <p>{moment(donations.endTime, ['HH:mm']).format('hh:mm a')}</p>
            </div>
            <div className="items-list-item-name">
              <span> End at: </span>
              <p>{moment(donations.endTime, ['HH:mm']).format('hh:mm a')}</p>
            </div>
          </div>
          <div className="items-list-item-name">
            <span>Donor/Organization Name: </span>
            <p>{donations.donor.name}</p>
          </div>
          <div className="items-list-item-name">
            <span>Donor/Organization Email: </span>
            <p>{donations.donor.email}</p>
          </div>
        </div>
      </div>
      {donations.status == 'FREE' ? (
        <div className="donationDetails-main-buttons">
          <button className="cart-btn">Add to Cart</button>
          <button className="book-btn" onClick={showModal}>
            Book Item
          </button>
        </div>
      ) : (
        <p
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            color: 'red',
          }}
        >
          You already booked this item
        </p>
        //   <p
        //   style={{
        //     textAlign: 'center',
        //     fontWeight: 'bold',
        //     textTransform: 'uppercase',
        //     color: 'red',
        //   }}
        // >
        //   {yourListing.user._id == getLoggedInId()
        //     ? 'You already booked this item'
        //     : 'this item is already booked by someone else'}
        // </p>
      )}
    </div>
  );
};

export default DonationDetails;
