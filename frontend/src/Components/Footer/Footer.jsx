import React from 'react';
import {Grid, Typography, IconButton, makeStyles} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

const useStyles = makeStyles({
  iconStyle: {
    borderRadius: '50%',
    color: 'White',
    fontSize: 40,
  },
  textStyle: {
    color: 'white',
  },
});
export default function Footer() {
  const classes = useStyles();
  return (
    <Grid container id="footer">
      <Grid item xs={12} sm={12}>
        <IconButton style={{marginTop: 30}}>
          <FacebookIcon className={classes.iconStyle} />
        </IconButton>
        <IconButton style={{marginTop: 30}}>
          <TwitterIcon className={classes.iconStyle} />
        </IconButton>
        <IconButton style={{marginTop: 30}}>
          <LinkedInIcon className={classes.iconStyle} />
        </IconButton>
        <IconButton style={{marginTop: 30}}>
          <InstagramIcon className={classes.iconStyle} />
        </IconButton>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Typography className={classes.textStyle}>
          &copy; Team WestWorld, Image Steganography 2020
        </Typography>
      </Grid>
      <Grid
        container
        xs={12}
        sm={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item style={{padding: 20}}>
          <Typography className={classes.textStyle}>Home</Typography>
        </Grid>
        <Grid item style={{padding: 20}}>
          <Typography className={classes.textStyle}>How It Works</Typography>
        </Grid>
        <Grid item style={{padding: 20}}>
          <Typography className={classes.textStyle}>Security</Typography>
        </Grid>
        <Grid item style={{padding: 20}}>
          <Typography className={classes.textStyle}>About</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
