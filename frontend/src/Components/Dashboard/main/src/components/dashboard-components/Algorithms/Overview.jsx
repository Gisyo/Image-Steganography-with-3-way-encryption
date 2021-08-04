import {Card} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';
import React from 'react';
import AesButton from './AES/AesButton';
import DesButton from './DES/DesButton';
import LSBButton from './LSB/LSBButton';

const Overview = () => {
  const useStyles = makeStyles({
    cardStyle: {
      width: 1050,
      height: 170,
      marginTop: -60,
      backgroundColor: '#7e57c2',
      color: 'white',
      marginBottom: 90,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.cardStyle}>
        <AesButton />
      </Card>
      <Card className={classes.cardStyle}>
        <DesButton />
      </Card>
      <Card className={classes.cardStyle}>
        <LSBButton />
      </Card>
    </div>
  );
};

export default Overview;
