import React from 'react';
import img1 from './logo111.png';
import {Grid, makeStyles, Typography} from '@material-ui/core';
import {Link as Links} from 'react-router-dom';
import {Link} from 'react-scroll';

const useStyles = makeStyles({
  logoStyle: {
    fontSize: 50,
    height: 50,
    color: '#0277bd',
    paddingTop: 20,
  },
  linkStyle: {
    padding: 15,
    paddingTop: 30,
  },
  navStyle: {
    marginLeft: -70,
    fontFamily: 'Lato',
    fontWeight: 'bolder',
    cursor: 'pointer',
    padding: 10,
    '&:hover': {
      backgroundColor: 'yellow',
      color: 'black',
    },
  },
  button1: {
    marginTop: -5,
    backgroundColor: '#e91e63',
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    '&:hover': {
      backgroundColor: '#4527a0',
    },
  },
});
export default function Navbar2() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container item xs={4} sm={4}>
        <Grid item>
          <img src={img1} alt="logo" className={classes.logoStyle} />
        </Grid>
        <Grid item>
          <Typography
            style={{
              fontSize: '25px',
              fontWeight: 'Bolder',
              paddingTop: 20,
            }}
          >
            Image
          </Typography>
          <Typography
            style={{
              fontSize: '12px',
              fontWeight: 'Light',
              marginTop: '-5px',
            }}
          >
            Steganography
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={2} sm={2}></Grid>
      <Grid
        container
        xs={6}
        sm={6}
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
      >
        <Grid item className={classes.linkStyle}>
          <Link
            activeClass="active"
            to="landing"
            spy={true}
            smooth={true}
            offset={-50}
            duration={500}
          >
            <Typography className={classes.navStyle}>
              <Links to="/" style={{color: 'black'}}>
                Home
              </Links>
            </Typography>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
