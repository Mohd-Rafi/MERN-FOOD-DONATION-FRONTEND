import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavDonor.css';
import { getLoggedInId } from '../../../utils';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Height } from '@mui/icons-material';
import customAxios from '../../../utils/customAxios';
import { Slide, Zoom } from 'react-awesome-reveal';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';

const NavDonor = props => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [data, setData] = useState({ name: '', image: '' });

  const getProfileDetails = async () => {
    const response = await customAxios.get(`/donor/profile/${getLoggedInId()}`);
    setData(response.data);
    // console.log(response.data);
  };
  const onChange = (e, key) => {
    setData({ ...data, [key]: e.target.value });
    console.log(data);
  };

  //upload
  const propss = {
    name: 'file',
    action: 'http://localhost:3000/upload/image',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(
          `${info.file.name.slice(0, 8)} file uploaded successfully`
        );
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name.slice(0, 8)} file upload failed.`);
      }
    },
  };

  // const onUploadProfilePic = e => {
  //   if (e.file && e.file.response) {
  //     setData({ ...data, image: e.file.response.url });
  //   }
  // };

  const onUploadProfilePic = async e => {
    if (data.image) {
      const item = data.image.split('3000/')[1];
      await customAxios.post('/upload/delete', { image: item });
      if (e.file && e.file.response) {
        setData({ ...data, image: e.file.response.url });
      }
    }
  };

  const onEditData = async () => {
    try {
      await customAxios.patch(
        `http://localhost:3000/donor/profile/update/${getLoggedInId()}`,
        data
      );
      getProfileDetails();
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProfileDetails();
  }, []);
  const onLogOut = () => {
    localStorage.removeItem('token');
    navigate('/donor/login');
  };
  // const profileEdit = id => {
  //   navigate(`/donor/profile/${getLoggedInId()}`);
  // };
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 10,
  };
  return (
    <div className="navdonor">
      <img src="/logo1.png" alt="" />
      <div className="navdonor-right-items">
        <NavLink to={'/donor/home'} className="navdonor-link">
          Home
        </NavLink>
        <NavLink to={'/donor/listing'} className="navdonor-link">
          Add Listings
        </NavLink>

        <img src={data.image} alt="" onClick={handleOpen} />
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <div className="donor-profile-edit-main-container">
              <Zoom>
                <div className="donor-profile-edit-main-container-img">
                  <img src={data.image} alt="not loaded" />
                  <Upload
                    {...propss}
                    className="upload-profile-btn"
                    onChange={onUploadProfilePic}
                  >
                    <Button className="btn" icon={<UploadOutlined />}>
                      Edit photo
                    </Button>
                  </Upload>
                </div>
                <div className="donor-profile-edit-main-container-details">
                  <input
                    type="text"
                    value={data.name}
                    onChange={e => onChange(e, 'name')}
                  />
                </div>
              </Zoom>
              <Zoom>
                <div className="donor-profile-edit-main-container-details-addList">
                  <button className="updatebtn" onClick={onEditData}>
                    Update
                  </button>
                  <div className="addandlogbtn">
                    <button
                      className="addlistbtn"
                      onClick={() => {
                        navigate('/donor/listing');
                      }}
                    >
                      Add listing
                    </button>
                    <button className="logoutbtn" onClick={onLogOut}>
                      LogOut
                    </button>
                  </div>
                </div>
              </Zoom>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default NavDonor;
