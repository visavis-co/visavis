import React from 'react';
import { Image, Navbar, Dropdown } from 'react-bootstrap';

const Header = props => {
    const assets = '/client/assets/';
    const myPic = assets + props.userInfo.pictureurl;
    const visavis = assets + 'visavis.jpg';
    return (
      <Navbar className="nav" expand="lg">
        <Navbar.Brand href='#'><img className='vis-banner d-none d-sm-block' src={visavis}/></Navbar.Brand>
        <Dropdown alignRight className='ml-auto'>
          <Dropdown.Toggle id="header-dropdown">
            <Image src={myPic} className="corner-pic roundedCircle" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/signup">Current Match</Dropdown.Item>
            <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    )
};

export default Header;
