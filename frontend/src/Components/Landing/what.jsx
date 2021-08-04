import React from 'react';
import {Typography, Grid} from '@material-ui/core';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import {makeStyles} from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  iconStyle: {
    fontSize: 130,
  },
  gridStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hym1Style: {
    marginTop: 15,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'lighter',
    lineHeight: '130%',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
  dividerStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 2,
  },
});

export default function What() {
  const classes = useStyles();
  return (
    <Grid container xs={12} sm={12}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" className={classes.gridStyle}>
          What is it about?
        </Typography>
        <Typography className={classes.hym1Style}>
          Image Steganography is all about making your confidential messages
          secure. Anyone viewing the image file would see no difference between
          the original file and the file with the message embedded into it.
        </Typography>
      </Grid>
      <Grid item xs={1} sm={1} className={classes.dividerStyle}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={12} sm={2} className={classes.gridStyle}>
        <ContactSupportOutlinedIcon className={classes.iconStyle} />
      </Grid>
      <Grid item xs={1} sm={1} className={classes.dividerStyle}>
        <Divider orientation="vertical" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" className={classes.gridStyle}>
          What is it for?
        </Typography>
        <Typography className={classes.hym1Style}>
          Image Steganography is for hiding your messages inside an image. It
          helps in making confidential messages more secure. This hidden
          information or messages cannot be retried without proper decoding
          technique.
        </Typography>
      </Grid>
    </Grid>
  );
}
