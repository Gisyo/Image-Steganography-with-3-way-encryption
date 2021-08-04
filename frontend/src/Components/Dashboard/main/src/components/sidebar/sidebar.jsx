import React, {useState, useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import {Nav} from 'reactstrap';
import {Button} from '@material-ui/core';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const Sidebar = (props) => {
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    var bearer = localStorage.getItem('accessToken');
    fetch('http://127.0.0.1:4000/api/v1/users/Profile', {
      headers: {
        Authorization: `Bearer ${bearer}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setName(response.data.name);
        setPhoto(response.data.photo);
      })
      .catch((error) => console.log(error));
  }, []);
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'selected' : '';
  };
  const useStyles = makeStyles({
    spanStyle: {
      color: 'Red',
      fontWeight: 'bold',
      display: 'block',
    },
    imgStyle: {
      height: 50,
      width: 50,
      zIndex: '9999',
      borderRadius: '50%',
      marginTop: 50,
      borderStyle: 'solid',
      borderColor: '#32CD32	',
    },
    nameStyle: {
      color: 'White',
      display: 'block',
      height: 30,
      fontSize: 15,
      marginTop: 61,
      backgroundColor: '#32CD32	',
      paddingLeft: 35,
      paddingRight: 20,
      marginLeft: -30,
      borderRadius: '0px 50px 50px 0px',
    },
    buttonStyle: {
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#D8DFFD',
      fontSize: 18,
      fontWeight: 'light',
      border: 'none',
      boxShadow: 'none',
      textAlign: 'left',
      color: 'black',
      '&:hover': {
        backgroundColor: '#ff5722',
        color: 'white',
      },
    },
    greetingStyle: {
      marginLeft: 25,
      marginTop: 25,
      color: 'black',
    },
    sidebarStyle: {
      backgroundColor: 'blue',
    },
  });
  const handleLogout = (e) => {
    window.location.href = '/';
  };
  const classes = useStyles();
  return (
    <aside
      className="left-sidebar"
      id="sidebarbg"
      data-sidebarbg="skin6"
      style={{backgroundColor: '#D8DFFD'}}
    >
      <Grid container xs={12} sm={12}>
        <Grid item xs={0} sm={2}></Grid>
        <Grid item xs={12} sm={10}>
          <Grid container xs={12} sm={12}>
            <Grid
              item
              xs={12}
              sm={12}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -25,
                marginLeft: -25,
              }}
            >
              <Typography style={{fontSize: 25}}>
                im<span style={{color: 'red'}}>ST</span>
              </Typography>
            </Grid>
            <img src={photo} alt="pp" className={classes.imgStyle} />
            <Typography
              variant="h5"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              className={classes.nameStyle}
            >
              {name}
            </Typography>
          </Grid>
          <Grid xs={12} sm={12}>
            <Typography className={classes.greetingStyle}>
              Hello, {name}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={2}></Grid>
      </Grid>
      <Nav id="sidebarnav" style={{display: 'block', marginTop: 50}}>
        {props.routes.map((prop, key) => {
          if (prop.redirect) {
            return null;
          } else {
            return (
              <li
                className={
                  activeRoute.bind(prop.path) +
                  (prop.pro ? ' active active-pro' : '') +
                  ' sidebar-item'
                }
                key={key}
              >
                <NavLink
                  to={prop.path}
                  className="sidebar-link"
                  activeClassName="active"
                  style={{
                    fontSize: 20,
                    paddingTop: 10,
                    color: 'black',
                    textAlign: 'left',
                    marginTop: -50,
                  }}
                >
                  <Button className={classes.buttonStyle} fullWidth>
                    <i className={prop.icon} />
                    <span className="hide-menu">{prop.name}</span>
                  </Button>
                </NavLink>
              </li>
            );
          }
        })}
      </Nav>
      <Button className={classes.buttonStyle} onClick={handleLogout} fullWidth>
        <i className="mdi mdi-logout-variant" />
        <span className="hide-menu">Logout</span>
      </Button>
    </aside>
  );
};
export default Sidebar;
