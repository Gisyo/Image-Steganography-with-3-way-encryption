import React from 'react';
import {Typography, Button, Grid} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import {Link} from 'react-scroll';
import {Link as Links} from 'react-router-dom';

const useStyles = makeStyles({
  hymStyle: {
    display: 'flex',
    justifyContent: 'center',
    fontSize: 25,
    letterSpacing: 5,
  },
  hym1Style: {
    marginTop: 15,
    display: 'flex',
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'lighter',
    lineHeight: '130%',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  titleStyle: {
    letterSpacing: -3,
  },
  button1: {
    backgroundColor: '#e91e63',
    color: 'white',
    paddingLeft: 20,
    paddingRight: 20,
    '&:hover': {
      backgroundColor: '#4527a0',
    },
  },
  button2: {
    border: 'outlined',
    paddingLeft: 20,
    paddingRight: 20,
    '&:hover': {
      backgroundColor: '#ffeb3b',
      color: 'white',
    },
  },
});

export default function HYM() {
  const classes = useStyles();
  return (
    <div className="HYM">
      <Typography variant="h3" className={classes.titleStyle}>
        Image Steganography
      </Typography>
      <Typography variant="subtitle1" className={classes.hymStyle}>
        Hide your messages
      </Typography>
      <Typography className={classes.hym1Style}>
        We use Image Steganography to hide you messages inside image and secret
        messages will be more secured. Image Steganography will also prevent
        your sensitive messages from possible leaks.
      </Typography>
      <Grid container xs={12} sm={12} style={{marginTop: 20}}>
        <Grid xs={6} sm={4}>
          <Button color="white" className={classes.button1}>
            <Links to="/SignUp" style={{color: 'white'}}>
              Get Started
            </Links>
          </Button>
        </Grid>
        <Grid xs={6} sm={4}>
          <Button variant="outlined" className={classes.button2}>
            <Link
              activeClass="active"
              to="details"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Learn More
            </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
