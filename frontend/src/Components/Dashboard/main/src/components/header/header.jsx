import React, {useEffect, useState} from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Navbar,
  NavbarBrand,
  Collapse,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
} from 'reactstrap';

import logodarkicon from '../../assets/images/logo-icon.png';
import logolighticon from '../../assets/images/logo-light-icon.png';
import logodarktext from '../../assets/images/logo-text.png';
import logolighttext from '../../assets/images/logo-light-text.png';
import profilephoto from '../../assets/images/users/1.jpg';
import {Typography, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const Header = (props) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    var bearer = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:4000/api/v1/users/Me', {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    })
      .then((Response) => Response.json())
      .then((Result) => {
        setName(Result.data.name);
        setEmail(Result.data.email);
      });
  }, []);

  useEffect(() => {
    var bearer = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:4000//api/v1/users//Me', {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    })
      .then((Response) => Response.json())
      .then((Result) => {
        setPhoto(Result.data.photo);
      });
  }, []);

  const showMobilemenu = () => {
    document.getElementById('main-wrapper').classList.toggle('show-sidebar');
  };

  /*--------------------------------------------------------------------------------*/
  /*To open Search Bar                                                              */
  /*--------------------------------------------------------------------------------*/
  const toggleMenu = () => {
    document.getElementById('search').classList.toggle('show-search');
  };

  const useStyles = makeStyles({
    logoStyle: {
      color: 'white',
    },
    searchStyle: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      color: 'white',
    },
  });
  const classes = useStyles();

  return (
    <header className="topbar navbarbg" data-navbarbg="skin4">
      <Navbar className="top-navbar" dark expand="md">
        <div className="navbar-header" id="logobg" data-logobg="skin4">
          {/*--------------------------------------------------------------------------------*/}
          {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
          {/*--------------------------------------------------------------------------------*/}
          <NavbarBrand href="/">
            <img src={photo} />
            <Typography className={classes.logoStyle} variant="h5">
              {name}
            </Typography>
          </NavbarBrand>
        </div>
        {/*--------------------------------------------------------------------------------*/}
        {/* Mobile View Toggler  [visible only after 768px screen]                         */}
        {/*--------------------------------------------------------------------------------*/}
        {/* <button
            className={'btn-link nav-toggler d-block d-md-none text-white'}
            onClick={() => showMobilemenu()}
          >
            <i className="ti-menu ti-close" />
          </button>

        <Collapse className="navbarbg" navbar data-navbarbg="skin4">
          <Nav className={classes.searchStyle} navbar>
            {/*--------------------------------------------------------------------------------*/}
        {/* Start Search-box toggle                                                        */}
        {/*--------------------------------------------------------------------------------*/}
        {/* <NavItem className="hidden-sm-down search-box">
            <NavLink
              href="#"
              className="hidden-sm-down"
              onClick={toggleMenu.bind(null)}
            >
              <i className="ti-search" />
            </NavLink>
            <Form className="app-search" id="search">
              <Input type="text" placeholder="Search & enter" />
              <button
                className="btn-link srh-btn"
                onClick={toggleMenu.bind(null)}
              >
                <i className="ti-close" />
              </button>
            </Form>
          </NavItem> */}

        {/*--------------------------------------------------------------------------------*/}
        {/* End Search-box toggle                                                          */}
        {/*--------------------------------------------------------------------------------*/}
        {/* </Nav> */}
        {/* //<Button className={classes.searchStyle}>{name}</Button> */}
        {/* <Nav className="ml-auto float-right" navbar>
            <NavItem>
              <a
                href="https://wrappixel.com/templates/materialpro-react-admin/"
                className="btn btn-danger mr-2"
                style={{marginTop: '20px'}}
              >
                Upgrade to Pro
              </a>
            </NavItem> */}
        {/* --------------------------------------------------------------------------------
            {/* Start Profile Dropdown                                                         */}
        {/*--------------------------------------------------------------------------------*/}
        {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="pro-pic">
                <img
                  src={profilephoto}
                  alt="user"
                  className="rounded-circle"
                  width="31"
                />
              </DropdownToggle>
              <DropdownMenu right className="user-dd">
                <DropdownItem>
                  <i className="ti-user mr-1 ml-1" /> My Account
                </DropdownItem>
                <DropdownItem>
                  <i className="ti-wallet mr-1 ml-1" /> My Balance
                </DropdownItem>
                <DropdownItem className="border-bottom">
                  <i className="ti-email mr-1 ml-1" /> Inbox
                </DropdownItem>
                <DropdownItem className="border-bottom">
                  <i className="ti-settings mr-1 ml-1" /> Account Settings
                </DropdownItem>
                <DropdownItem href="/pages/login">
                  <i className="fa fa-power-off mr-1 ml-1" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */}
        {/*--------------------------------------------------------------------------------*/}
        {/* End Profile Dropdown                                                           */}
        {/* </Nav>{' '} */}
        {/* </Collapse> */}
      </Navbar>
    </header>
  );
};
export default Header;
