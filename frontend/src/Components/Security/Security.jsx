import React from 'react';
import cardInfo from './Info';
import Cardx from './Card';
import {Grid, Typography, makeStyles} from '@material-ui/core';
const useStyles = makeStyles({
  cardStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Security() {
  const classes = useStyles();
  const getSecurityCard = (cardContentObj) => {
    return (
      <Grid item xs={12} sm={4} className={classes.cardStyle}>
        <Cardx {...cardContentObj} />
      </Grid>
    );
  };
  return (
    <Grid container spacing={4} id="security">
      <Grid xs={12} sm={12} style={{display: 'flex', justifyContent: 'center'}}>
        <Typography
          variant="h3"
          style={{
            letterSpacing: 5,
            color: 'White',
          }}
        >
          Security
        </Typography>
      </Grid>
      {cardInfo.map((cardContentObj) => getSecurityCard(cardContentObj))}
    </Grid>
  );
}
