import React from 'react';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';

import {
  Grid,
  Card,
  makeStyles,
  Typography,
  CardMedia,
  IconButton,
} from '@material-ui/core';

const useStyles = makeStyles({
  textStyle: {
    color: 'white',
    marginTop: 20,
    fontWeight: 'light',
  },
  text1Style: {
    color: 'white',
    fontWeight: 'light',
  },
  media: {
    marginTop: 30,
    marginLeft: 60,
    height: 80,
    width: 80,
    borderRadius: '50%',
    boxShadow: '-5px 5px 20px #000000',
  },
  cardStyle: {
    height: 320,
    width: 200,
    background: '#191E40',
    borderRadius: '4%',
  },
  iconStyle: {
    borderRadius: '50%',
    color: 'white',
    fontSize: 40,
  },
});

export default function Personcard(props) {
  const classes = useStyles();
  const {name, img, talent, work} = props;
  return (
    <Grid xs={6} sm={3} style={{marginLeft: -125}}>
      <Card className={classes.cardStyle}>
        <CardMedia image={img} className={classes.media}></CardMedia>
        <Typography variant="h6" className={classes.textStyle}>
          {name}
        </Typography>
        <Typography
          variant="body2"
          className={classes.text1Style}
          style={{marginTop: 10}}
        >
          {talent}
        </Typography>
        <Typography variant="body2" className={classes.text1Style}>
          {work}
        </Typography>
        <IconButton style={{marginTop: 30}}>
          <FacebookIcon className={classes.iconStyle} />
        </IconButton>
        <IconButton style={{marginTop: 30}}>
          <TwitterIcon className={classes.iconStyle} />
        </IconButton>
        <IconButton style={{marginTop: 30}}>
          <LinkedInIcon className={classes.iconStyle} />
        </IconButton>
      </Card>
    </Grid>
  );
}
