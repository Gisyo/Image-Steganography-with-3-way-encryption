import React from 'react';
import {makeStyles} from '@material-ui/styles';
import {
  Card,
  CardMedia,
  CardHeader,
  Divider,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  imgStyle: {
    height: 250,
    display: 'flex',
    justifyContent: 'center',
  },
  cardStyle: {
    height: 420,
    width: 300,
    borderRadius: '4%',
  },
  headerStyle: {
    fontFamily: 'Roboto',
  },
  descStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    lineHeight: '130%',
    fontSize: '15px',
    padding: '10px',
  },
}));

export default function Cardx(props) {
  const classes = useStyles();
  const {imgSrc, title, description} = props;
  return (
    <>
      <Card className={classes.cardStyle}>
        <CardMedia image={imgSrc} className={classes.imgStyle}></CardMedia>
        <Divider />
        <CardHeader
          title={title}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
          className={classes.headerStyle}
        />
        <Typography className={classes.descStyle}>{description}</Typography>
      </Card>
    </>
  );
}
