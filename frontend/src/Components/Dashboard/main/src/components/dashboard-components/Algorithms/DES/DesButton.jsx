import {Button, makeStyles, Typography} from '@material-ui/core';
import React from 'react';
import DesDecryption from './DesDecryption';
import DesEncryption from './DesEncryption';

const DesButton = () => {
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
    return <DesEncryption />;
  } else if (decryptRedirect === true) {
    return <DesDecryption />;
  } else
    return (
      <div>
        <Typography
          style={{
            marginLeft: '20%',
            marginBottom: 20,
            fontSize: 25,
            fontFamily: 'Pacifico',
          }}
        >
          Data Encryption Standard
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

export default DesButton;
