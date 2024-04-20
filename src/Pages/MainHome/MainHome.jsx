import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainHome.css';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer } from 'antd';
import {
  Bounce,
  Fade,
  Flip,
  Hinge,
  JackInTheBox,
  Slide,
  Zoom,
} from 'react-awesome-reveal';
const MainHome = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const onClick = () => {
    navigate('/login-selector');
  };
  const drawerStyles = {
    mask: {
      backdropFilter: 'blur(10px)',
    },
  };

  return (
    <div className="main-home">
      <div className="navbar-main">
        <img src="logo1.png" alt="" />
        <div className="navbar-main-center-items">
          <a href="#home">Home</a>
          <a href="#foundations">Foundations</a>
          <a href="#events">Events</a>
          <a href="#aboutus">About Us</a>
        </div>
        <div className="navbar-main-join-now">
          <button onClick={onClick}>Join Now</button>
          <div className="drawer-icons">
            <MenuIcon type="primary" onClick={showDrawer}>
              Open
            </MenuIcon>
          </div>
          <Drawer
            title={<p className="menu">Menu</p>}
            onClose={onClose}
            open={open}
            styles={drawerStyles}
          >
            <Slide direction="left">
              <div className="drawer-items" onClick={onClose}>
                <a href="#home">Home</a>
                <a href="#foundations">Foundations</a>
                <a href="#events">Events</a>
                <a href="#aboutus">About Us</a>
              </div>
            </Slide>
          </Drawer>
        </div>
      </div>
      <div id="home" className="main-home-main-content">
        <Fade direction="down">
          <div className="main-home-main-content-left">
            <div className="main-home-main-content-left-heading">
              <h1 className="head1">Be The Reason </h1>
              <h1 className="head2">Someone Smiles Today !</h1>
            </div>
            <div className="main-home-main-content-left-lorem">
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Reprehenderit, dolores vero? Exercitationem veniam debitis
                similique doloribus excepturi obcaecati quibusdam odio animi
                voluptatibus ex quae neque, illum quo, natus explicabo voluptas?
              </p>
            </div>
            <div className="main-home-main-content-left-button">
              <button onClick={onClick}>Join Now</button>
            </div>
          </div>
        </Fade>
        <Zoom direction="top">
          <div className="main-home-main-content-img">
            <img src="img1.png" alt="" />
          </div>
        </Zoom>
      </div>
      <div id="foundations" className="main-foundations">
        <Zoom>
          <h1 className="main-foundations-header">Why Choose Us ?</h1>
          <div className="main-foundations-items">
            <div className="cards">
              <img src="img3.png" alt="" />
              <p className="bold">World wide leaders</p>
            </div>
            <div className="cards">
              <img src="img4.png" alt="" />
              <p className="bold">Trusted Organization</p>
            </div>
            <div className="cards">
              <img src="img5.png" alt="" />
              <p className="bold">24*7 Support</p>
            </div>
          </div>
        </Zoom>
      </div>
      <div className="main-home-foundation"></div>
    </div>
  );
};

export default MainHome;
