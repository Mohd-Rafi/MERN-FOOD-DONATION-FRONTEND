import React, { useEffect, useState } from 'react';
import customAxios from '../../../../utils/customAxios';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useParams } from 'react-router-dom';

import './YourBookingDetails.css';

const YourBookingDetails = () => {
  const { id } = useParams();
  const [donation, setDonations] = useState({ listing: '', donor: '' });
  const getListDetails = async () => {
    const response = await customAxios.get(`/order/your-bookings/${id}`);
    setDonations(response.data);
  };
  console.log(donation);

  const images = donation.listing.images
    ? donation.listing.images.map(item => ({
        original: item,
        thumbnail: item,
        originalHeight: 400,
        originalWidth: 450,
      }))
    : [];

  useEffect(() => {
    getListDetails();
  }, []);
  return (
    <div className="your-booking-details-main">
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
    </div>
  );
};

export default YourBookingDetails;
