import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customAxios from '../../../../utils/customAxios';
import NavDonor from '../../../Components/NavDonor/NavDonor';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './ListingDetails.css';

const ListingDetails = () => {
  const { id } = useParams();
  const [listData, setListData] = useState({ images: [], name: '' });
  const getListDetails = async () => {
    const response = await customAxios.get(`/listing/details/${id}`);
    setListData(response.data);
  };
  console.log(listData);

  useEffect(() => {
    getListDetails();
  }, []);
  return (
    <div className="listing-details-main">
      <NavDonor />

      <div className="listing-details-main-container">
        <Carousel className="carouselas" autoPlay interval={2000} infiniteLoop>
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
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
