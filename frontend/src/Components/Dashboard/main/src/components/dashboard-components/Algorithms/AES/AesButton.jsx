import {Button, Typography} from '@material-ui/core';
import React from 'react';
import AesEncryption from './AesEncryption';
import AesDecryption from './AesDecryption';
import {makeStyles} from '@material-ui/styles';

const AesButton = () => {
  const [aesRedirect, setAesRedirect] = React.useState('false');
  const [aesRedirect1, setAesRedirect1] = React.useState('false');
  const handleEncryptAES = (e) => {
    setAesRedirect(true);
  };
  const handleDecryptAES = (e) => {
    setAesRedirect1(true);
  };
  const useStyles = makeStyles({
    buttonStyle: {
      backgroundColor: 'white',
      color: 'black',
      marginLeft: 50,
      padding: 15,
      '&:hover': {
        backgroundColor: '#ff5722',
        color: 'white',
      },
    },
  });

  const classes = useStyles();

  if (aesRedirect === true) {
    return <AesEncryption />;
  } else if (aesRedirect1 === true) {
    return <AesDecryption />;
  } else
    return (
      <div>
        <Typography
          style={{
            marginLeft: '18%',
            marginBottom: 20,
            fontSize: 25,
            fontFamily: 'Pacifico',
          }}
        >
          Advanced Encryption Standard
        </Typography>
        <Button
          className={classes.buttonStyle}
          onClick={handleEncryptAES}
          disableElevation
        >
          Encrypt Message
        </Button>
        <Button
          className={classes.buttonStyle}
          onClick={handleDecryptAES}
          disableElevation
        >
          Decrypt Message
        </Button>
      </div>
    );
};

export default AesButton;
