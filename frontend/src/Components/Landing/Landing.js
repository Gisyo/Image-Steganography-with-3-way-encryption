import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import Navbar from './Navbar';
import img2 from './mainpic.png';
import HYM from './HYM';
import What from './what';
import Details from '../Details/details';
import Security from '../Security/Security';
import About from '../About/About';
import Footer from '../Footer/Footer';

const useStyles = makeStyles({
  background: {
    height: '100vh',
    width: 'auto',
    //backgroundImage: `url(${img1})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  grid2Style: {
    height: 500,
  },
  cardStyle: {
    height: 300,
    background: 'linear-gradient(45deg, #FE5F75 30%, #FC9842 90%)',
    color: 'white',
  },
  details: {
    height: 350,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityStyle: {
    height: 550,
    background: 'linear-gradient(45deg, #FE5F75 30%, #FC9842 90%)',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutStyle: {
    height: 480,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerStyle: {
    height: 200,
    backgroundColor: '#757575',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
export default function Landing() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.background}>
        <Grid container xs={12} sm={12}>
          <Grid xs={0} sm={1}></Grid>
          <Grid xs={12} sm={10}>
            <Navbar />
          </Grid>
          <Grid xs={0} sm={1}></Grid>
        </Grid>
        <Grid container xs={12} sm={12} className={classes.grid2Style}>
          <Grid xs={0} sm={1}></Grid>
          <Grid
            xs={5}
            sm={4}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <HYM />
          </Grid>
          <Grid
            xs={7}
            sm={6}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={img2} alt="imagexd" style={{transform: 'scale(1)'}}></img>
          </Grid>
          <Grid xs={0} sm={1}></Grid>
        </Grid>
      </div>
      <Grid container xs={12} sm={12} className={classes.cardStyle}>
        <Grid item xs={0} sm={1}></Grid>
        <Grid
          item
          xs={12}
          sm={10}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <What />
        </Grid>
        <Grid item xs={0} sm={1}></Grid>
      </Grid>
      <Grid container xs={12} sm={12} className={classes.details}>
        <Grid xs={0} sm={1}></Grid>
        <Grid xs={12} sm={10}>
          <Details />
        </Grid>
        <Grid xs={0} sm={1}></Grid>
      </Grid>
      <Grid container xs={12} sm={12} className={classes.securityStyle}>
        <Grid xs={0} sm={2}></Grid>
        <Grid xs={12} sm={8}>
          <Security />
        </Grid>
        <Grid xs={0} sm={2}></Grid>
      </Grid>
      <Grid container xs={12} sm={12} className={classes.aboutStyle}>
        <Grid xs={0} sm={1}></Grid>
        <Grid xs={12} sm={10}>
          <About />
        </Grid>
        <Grid xs={0} sm={1}></Grid>
      </Grid>
      <Grid container xs={12} sm={12} className={classes.footerStyle}>
        <Grid xs={0} sm={1}></Grid>
        <Grid xs={12} sm={10}>
          <Footer />
        </Grid>
        <Grid xs={0} sm={1}></Grid>
      </Grid>
    </>
  );
}
