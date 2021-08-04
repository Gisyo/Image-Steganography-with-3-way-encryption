import { Button, Dialog, makeStyles, Slide } from '@material-ui/core';
import React, { useState } from 'react';
import LSBButton from './LSBButton';
import LSBPopOver from './LSBPopOver';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function LSBEncryption() {
	const [ goBack, setGoBack ] = React.useState(false);
	const [ text, setText ] = useState();
	const [ revealFile, setRevealFile ] = useState('');
	const [ open, setOpen ] = useState(false);
	const [ error, setError ] = useState(false);

	function showMessage() {
		const formData = new FormData();
		if (revealFile === '') {
			alert('Please upload file');
			setError(true);
		}
		else {
			formData.append('revealFile', revealFile);
			console.log(formData);
		}

		fetch('http://127.0.0.1:8080/steganography/v1/algo/lsb/decrypt', {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.code === 'STEG003') {
					alert(response.message);
					setError(true);
				}
				else if (response.text) {
					setText(response.text);
					setOpen(true);
					setError(false);
				}
			})
			.catch((error) => console.log(error));
	}
	const handleGoBack = (e) => {
		setGoBack(true);
	};
	const handleClose = () => {
		setOpen(false);
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
				color: 'white',
			},
		},
	});
	console.log(error);
	const classes = useStyles();
	if (open === true && error === false) {
		return (
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
			>
				<LSBPopOver text={text} handleClose={handleClose} />
			</Dialog>
		);
	}
	if (goBack === true) {
		return <LSBButton />;
	}
	else
		return (
			<div>
				<form noValidate autoComplete='off'>
					<input
						type='file'
						name='revealFile'
						key='revealFile'
						onChange={(e) => setRevealFile(e.target.files[0])}
					/>
					<Button
						type='button'
						variant='contained'
						color='primary'
						className={classes.buttonStyle}
						onClick={(e) => showMessage()}
					>
						Show
					</Button>
					<Button onClick={handleGoBack} className={classes.buttonStyle} style={{ marginLeft: 50 }}>
						Back
					</Button>
				</form>
			</div>
		);
}
export default LSBEncryption;
