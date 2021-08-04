import { Button, Dialog, makeStyles, Slide, TextField } from '@material-ui/core';
import React from 'react';
import AesButton from './AesButton';
import AesPopover from './AesPopover';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});
const AesDecryption = () => {
	const [ goBack, setGoBack ] = React.useState(false);
	const [ secretKey, setSecretKey ] = React.useState();
	const [ decryptString, setDecryptString ] = React.useState();
	const [ decryptedText, setDecryptedText ] = React.useState();
	const [ open, setOpen ] = React.useState(false);
	const [ encryptedTextSize, setEncryptedTextSize ] = React.useState();
	const [ decryptedTextSize, setDecryptedTextSize ] = React.useState();
	const [ encryptedText, setEncryptedText ] = React.useState();

	function decryption() {
		fetch('http://127.0.0.1:8080/steganography/v1/algo/aes/decrypt', {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				decryptString: decryptString,
				secretKey: secretKey,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.decryptedText) {
					setDecryptedText(response.decryptedText);
					setDecryptedTextSize(response.decryptedTextSize);
					setEncryptedTextSize(response.encryptedTextSize);
					setEncryptedText(response.encryptedText);
					setOpen(true);
				}
				else if (response.message) {
					alert('Please complete the input fields.');
				}
			})
			.catch((error) => console.log(error));
	}
	const handleGoBack = (e) => {
		setGoBack(true);
	};

	const useStyles = makeStyles({
		textfieldStyle: {
			backgroundColor: 'white',
			borderRadius: 10,
			marginLeft: 20,
			marginRight: 20,
		},
		buttonStyle: {
			marginTop: 8,
			backgroundColor: 'white',
			color: 'black',
			'&:hover': {
				backgroundColor: '#ff5722',
			},
		},
	});

	const classes = useStyles();
	const handleClose = () => {
		setOpen(false);
	};
	if (open === true) {
		return (
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<AesPopover
					handleClose={handleClose}
					encryptedTextSize={encryptedTextSize}
					encryptedText={encryptedText}
					decryptedText={decryptedText}
					decryptedTextSize={decryptedTextSize}
				/>
			</Dialog>
		);
	}

	if (goBack === true) {
		return <AesButton />;
	}
	else
		return (
			<div>
				<form noValidate autoComplete='off'>
					<TextField
						className={classes.textfieldStyle}
						id='text'
						label='text'
						variant='outlined'
						name='text'
						value={decryptString}
						onChange={(e) => setDecryptString(e.target.value)}
					/>
					<TextField
						className={classes.textfieldStyle}
						id='secretKey'
						label='secretKey'
						variant='outlined'
						name='secretKey'
						value={secretKey}
						onChange={(e) => setSecretKey(e.target.value)}
					/>
					<Button
						className={classes.buttonStyle}
						type='button'
						variant='contained'
						color='primary'
						onClick={(e) => decryption()}
					>
						decrypt
					</Button>
					<Button onClick={handleGoBack} className={classes.buttonStyle} style={{ marginLeft: 50 }}>
						Back
					</Button>
				</form>
			</div>
		);
};
export default AesDecryption;
