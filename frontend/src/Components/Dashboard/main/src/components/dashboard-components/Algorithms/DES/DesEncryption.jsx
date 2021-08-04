import { Button, Dialog, makeStyles, Slide, TextField } from '@material-ui/core';
import React from 'react';
import DesButton from './DesButton';
import DesPopover from './DesPopover';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function DesEncryption() {
	const [ goBack, setGoBack ] = React.useState(false);
	const [ originalText, setOriginalText ] = React.useState();
	const [ encryptedText, setEncryptedText ] = React.useState();
	const [ open, setOpen ] = React.useState(false);
	const [ encryptedSize, setEncryptedSize ] = React.useState();
	const [ originalSize, setOriginalSize ] = React.useState();
	const [ des, setDes ] = React.useState(false);

	function desEncryption() {
		fetch('http://127.0.0.1:8080/steganography/v1/algo/des/encrypt', {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				originalText: originalText,
			}),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.encryptedText) {
					setEncryptedText(response.encryptedText);
					setOpen(true);
					setDes(true);
					setOriginalSize(response.originalSize);
					setOriginalText(response.originalText);
					setEncryptedSize(response.encryptedSize);
				}
				else {
					alert(response.message);
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
				<DesPopover
					handleClose={handleClose}
					encryptedSize={encryptedSize}
					encryptedText={encryptedText}
					originalText={originalText}
					originalSize={originalSize}
					des={des}
				/>
			</Dialog>
		);
	}

	if (goBack === true) {
		return <DesButton />;
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
						value={originalText}
						onChange={(e) => setOriginalText(e.target.value)}
					/>
					<Button
						className={classes.buttonStyle}
						type='button'
						variant='contained'
						color='primary'
						onClick={(e) => desEncryption()}
					>
						encrypt
					</Button>
					<Button onClick={handleGoBack} className={classes.buttonStyle} style={{ marginLeft: 50 }}>
						Back
					</Button>
				</form>
			</div>
		);
}
