import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import customAxios from '../../../../utils/customAxios';
import NavDonor from '../../../Components/NavDonor/NavDonor';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import moment from 'moment/moment';

import './ListingDetails.css';

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listData, setListData] = useState({ images: [], name: '' });
  const [listOrderedData, setListOrderedData] = useState({ user: '' });

  const getListDetails = async () => {
    const response = await customAxios.get(`/listing/details/${id}`);
    setListData(response.data);
  };
  // console.log(listData);

  const onOrderItems = async () => {
    const response = await customAxios.get(`/order/${id}`);
    setListOrderedData(response.data[0]);
  };

  const onDeleteClick = async () => {
    await customAxios.delete(`/listing/details/${id}`);
    navigate('/donor/home');
  };
  console.log(listOrderedData);

  useEffect(() => {
    getListDetails();
    onOrderItems();
  }, []);
  return (
    <div className="listingDetails-main-main">
      <NavDonor />
      <div className="listing-details-main">
        <div className="listing-details-main-container">
          <Carousel
            className="carouselas"
            autoPlay={true}
            interval={2000}
            infiniteLoop
            showThumbs={false}
            autoFocus={false}
            // centerMode={true}
            // centerSlidePercentage={95}
            emulateTouch={true}
            showArrows={true}
          >
            <div className="image-list">
              <img src={listData.images[0]} />
            </div>
            <div className="image-list">
              <img src={listData.images[1]} />
            </div>
            <div className="image-list">
              <img src={listData.images[2]} />
            </div>
          </Carousel>
          <div className="listing-details-main-container-items">
            <div className="items-list-item-name">
              <span>Item name: </span>
              <p>{listData.name}</p>
            </div>
            <div className="items-list-item-name">
              <span>Item description: </span>
              <p>{listData.description}</p>
            </div>
            <div className="items-list-item-name">
              <span>Item category: </span>
              <p>{listData.category}</p>
            </div>
            <div className="items-list-item-name">
              <span>Item Count: </span>
              <p>{listData.headCount}</p>
            </div>
            <div className="items-list-item-name">
              <span>Item Status: </span>
              <p>{listData.status}</p>
            </div>
            <div className="blabla">
              <div className="items-list-item-name">
                <span> Start at: </span>
                <p>{moment(listData.endTime, ['HH:mm']).format('hh:mm a')}</p>
              </div>
              <div className="items-list-item-name">
                <span> End at: </span>
                <p>{moment(listData.endTime, ['HH:mm']).format('hh:mm a')}</p>
              </div>
            </div>
            <div className="items-list-item-name">
              <span>Reciever Name: </span>
              <p>{listOrderedData.user.name}</p>
            </div>
          </div>
        </div>
        <div className="listingDetailsUpdateAndDeleteBtn">
          <button className="updatebtn">Update</button>
          <button className="updatebtn deletebtn" onClick={onDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
