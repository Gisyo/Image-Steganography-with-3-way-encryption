import React from 'react';
import {Grid, Typography, IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import SecurityOutlinedIcon from '@material-ui/icons/SecurityOutlined';

const useStyles = makeStyles({
  textStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#d81b60',
  },
  iconStyle: {
    fontSize: 80,
    color: '#d81b60',
  },
});

export default function Details() {
  const classes = useStyles();
  return (
    <Grid container xs={12} sm={12} id="details">
      <Grid
        xs={12}
        sm={12}
        className={classes.textStyle}
        style={{marginTop: -30}}
      >
        <Typography variant="h3" style={{letterSpacing: 5}}>
          How It Works?
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3} className={classes.textStyle} direction="column">
        <IconButton>
          <ImageOutlinedIcon className={classes.iconStyle} />
        </IconButton>

        <Typography variant="h5" className={classes.textStyle}>
          Image
        </Typography>
        <Typography variant="subtitle2">Upload Image</Typography>
      </Grid>
      <Grid item xs={6} sm={3} className={classes.textStyle} direction="column">
        <IconButton>
          <MailOutlinedIcon className={classes.iconStyle} />
        </IconButton>
        <Typography variant="h5" className={classes.textStyle}>
          Information
        </Typography>
        <Typography variant="subtitle2">
          Add Information you want to hide
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3} className={classes.textStyle} direction="column">
        <IconButton>
          <HttpsOutlinedIcon className={classes.iconStyle} />
        </IconButton>

        <Typography variant="h5" className={classes.textStyle}>
          Lock
        </Typography>
        <Typography variant="subtitle2">
          Encrypt it with our algorithm
        </Typography>
      </Grid>
      <Grid item xs={6} sm={3} className={classes.textStyle} direction="column">
        <IconButton>
          <SecurityOutlinedIcon className={classes.iconStyle} />
        </IconButton>

        <Typography variant="h5" className={classes.textStyle}>
          Secure
        </Typography>
        <Typography variant="subtitle2">
          Your confidential information is now secured
        </Typography>
      </Grid>
    </Grid>
  );
}
