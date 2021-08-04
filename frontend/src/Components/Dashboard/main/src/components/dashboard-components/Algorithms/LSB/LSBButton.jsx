import {Button, makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import LSBDecryption from './LSBDecryption';
import LSBEncryption from './LSBEncryption';

const LSBButton = () => {
  const [encryptRedirect, setEncryptRedirect] = React.useState(false);
  const [decryptRedirect, setDecryptRedirect] = React.useState(false);
  const handleEncryptRedirect = (e) => {
    setEncryptRedirect(true);
  };
  const handleDecryptRedirect = (e) => {
    setDecryptRedirect(true);
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
  if (encryptRedirect === true) {
    return <LSBEncryption />;
  } else if (decryptRedirect === true) {
    return <LSBDecryption />;
  } else
    return (
      <div>
        <Typography
          style={{
            marginLeft: '25%',
            marginBottom: 20,
            fontSize: 25,
            fontFamily: 'Pacifico',
          }}
        >
          Least Significant Bits
        </Typography>
        <Button
          className={classes.buttonStyle}
          onClick={handleEncryptRedirect}
          disableElevation
        >
          Encrypt Message
        </Button>
        <Button
          className={classes.buttonStyle}
          onClick={handleDecryptRedirect}
          disableElevation
        >
          Decrypt Message
        </Button>
      </div>
    );
};

export default LSBButton;
