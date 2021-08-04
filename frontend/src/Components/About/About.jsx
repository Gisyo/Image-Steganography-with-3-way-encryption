import React from 'react';
import {Grid, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import Personcard from './personcard';
import Info from './data';

const useStyles = makeStyles({
  gridStyle: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});

export default function About(props) {
  const classes = useStyles();
  const getPersonCard = (personContentObj) => {
    return (
      <Grid item xs={12} sm={3} className={classes.gridStyle}>
        <Personcard {...personContentObj} />
      </Grid>
    );
  };
  return (
    <Grid container spacing={4} id="about">
      <Grid xs={12} sm={12} style={{display: 'flex', justifyContent: 'center'}}>
        <Typography
          variant="h3"
          style={{
            letterSpacing: 5,
            color: '#d81b60',
            marginTop: 0,
          }}
        >
          About
        </Typography>
      </Grid>
      {Info.map((personContentObj) => getPersonCard(personContentObj))}
    </Grid>
  );
}
