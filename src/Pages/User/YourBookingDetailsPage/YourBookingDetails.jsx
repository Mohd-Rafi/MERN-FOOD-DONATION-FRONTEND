import React, { useEffect, useState } from 'react';
import customAxios from '../../../../utils/customAxios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Modal } from 'antd';
import './YourBookingDetails.css';

const YourBookingDetails = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [donation, setDonations] = useState({ listing: '', donor: '' });

  const navigate = useNavigate();
  const getListDetails = async () => {
    const response = await customAxios.get(`/order/your-bookings/${id}`);
    setDonations(response.data);
  };
  console.log(donation);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const response = await customAxios.delete(
      `/order/delete/${donation._id}/${donation.listing._id}`
    );
    setIsModalOpen(false);
    navigate('/user/your-bookings');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const images = donation.listing.images
    ? donation.listing.images.map(item => ({
        original: item,
        thumbnail: item,
        originalHeight: 400,
        originalWidth: 450,
      }))
    : [];

  const onClickDelete = async () => {};
  useEffect(() => {
    getListDetails();
  }, []);
  return (
    <div className="your-booking-details-main">
      <Modal
        title="Confirm to delete"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are You Sure..?</p>
      </Modal>
      <div className="your-booking-details-main-container">
        <div className="your-booking-details-main-container-image">
          <ImageGallery
            items={images}
            thumbnailPosition="left"
            showPlayButton={false}
            infinite={true}
            autoPlay={true}
            slideDuration={500}
            showFullscreenButton={false}
            onSlide={() => {}}
          />
        </div>
        <div className="your-booking-details-main-container-contents">
          <h1>{donation.listing.name}</h1>
          <p
            className={`itemcat ${
              donation.listing.category == 'Veg' ? 'item-veg' : ''
            }`}
          >
            {donation.listing.category}
          </p>
          <p>{donation.listing.location}</p>
          <p>{donation.listing.headCount}</p>
          <p>{donation.listing.location}</p>
          <p>{donation.listing.startTime}</p>
          <p>{donation.listing.endTime}</p>
        </div>
      </div>
      <button className="deleteBtn" onClick={showModal}>
        Delete
      </button>
    </div>
  );
};

export default YourBookingDetails;
