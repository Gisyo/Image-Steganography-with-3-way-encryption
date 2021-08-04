import { Button, Dialog, makeStyles, Slide, TextField } from '@material-ui/core';
import React from 'react';
import AesButton from './AesButton';
import AesPopover from './AesPopover';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const AesEncryption = () => {
	const [ goBack, setGoBack ] = React.useState(false);
	const [ text, setText ] = React.useState();
	const [ encryptedText, setEncryptedText ] = React.useState();
	const [ secretKey, setSecretKey ] = React.useState();
	const [ open, setOpen ] = React.useState(false);
	const [ encryptedSize, setEncryptedSize ] = React.useState();
	const [ originalText, setOriginalText ] = React.useState();
	const [ originalSize, setOriginalSize ] = React.useState();
	const [ aes, setAes ] = React.useState(false);

	function encryption() {
		fetch('http://127.0.0.1:8080/steganography/v1/algo/aes/encrypt', {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				text: text,
				secretKey: secretKey,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.encryptedText) {
					setEncryptedText(response.encryptedText);
					setOpen(true);
					setAes(true);
					setOriginalSize(response.originalSize);
					setOriginalText(response.originalText);
					setEncryptedSize(response.encryptedSize);
				}
				else if (
					response.message === "secret key cannot be blank'" ||
					response.message === 'text cannot be blank'
				) {
					alert('Please complete the input fields.');
				}
				else {
					alert(response.message);
				}
			})
			.catch((error) => {
				console.log(error);
			});
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
			color: 'black',
			backgroundColor: 'white',
			'&:hover': {
				backgroundColor: '#ff5722',
			},
		},
	});

	const handleClose = () => {
		setOpen(false);
	};

	const classes = useStyles();

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
					encryptedSize={encryptedSize}
					encryptedText={encryptedText}
					originalText={originalText}
					originalSize={originalSize}
					aes={aes}
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
						value={text}
						onChange={(e) => setText(e.target.value)}
						required
					/>
					<TextField
						className={classes.textfieldStyle}
						id='secretKey'
						label='secretKey'
						variant='outlined'
						name='secretKey'
						value={secretKey}
						onChange={(e) => setSecretKey(e.target.value)}
						required
					/>
					<Button
						className={classes.buttonStyle}
						type='button'
						variant='contained'
						color='primary'
						onClick={(e) => encryption()}
					>
						encrypt
					</Button>
					<Button onClick={handleGoBack} className={classes.buttonStyle} style={{ marginLeft: 50 }}>
						Back
					</Button>
				</form>
			</div>
		);
};

export default AesEncryption;
