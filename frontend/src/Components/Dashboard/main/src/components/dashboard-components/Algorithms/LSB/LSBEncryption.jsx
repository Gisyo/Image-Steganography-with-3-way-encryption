import { Button, Dialog, makeStyles, Slide, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import LSBButton from './LSBButton';
import LSBPopOver from './LSBPopOver';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

function LSBEncryption() {
	const [ goBack, setGoBack ] = React.useState(false);
	const [ img, setImg ] = useState();
	const [ textFile, setTextFile ] = useState('');
	const [ imageFile, setImageFile ] = useState('');
	const [ open, setOpen ] = useState(false);
	const [ imageSent, setImageSent ] = useState(false);
	const [ fail, setFail ] = useState(false);
	const [ path, setPath ] = useState('');

	function hideMessage() {
		const formData = new FormData();
		if (textFile === '' || imageFile === '') {
			alert('Either some of the Input fields are empty or in incorrect fields');
			setFail(true);
		}
		else {
			formData.append('textFile', textFile);
			formData.append('imageFile', imageFile);
		}
		console.log(formData);

		fetch('http://127.0.0.1:8080/steganography/v1/algo/lsb/encrypt', {
			method: 'POST',
			body: formData,
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.image) {
					setImg(response.image);
					setPath(response.path);
					setOpen(true);
					setImageSent(true);
					setFail(false);
				}
				else if (response.code === 'STEG001') {
					alert('Text File too big.');
				}
				else {
					alert('Either some of the Input fields are empty or in incorrect fields');
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

	const classes = useStyles();
	if (open === true && fail === false) {
		return (
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-labelledby='alert-dialog-slide-title'
				aria-describedby='alert-dialog-slide-description'
				style={{ height: '100%', width: 'auto' }}
			>
				<LSBPopOver img={img} path={path} handleClose={handleClose} imageSent={imageSent} />
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
						name='imageFile'
						key='imageFile'
						label='Upload Image'
						onChange={(e) => setImageFile(e.target.files[0])}
					/>
					<Typography>Choose Image</Typography>

					<input
						type='file'
						name='textFile'
						key='textFile'
						label='Upload text File'
						onChange={(e) => setTextFile(e.target.files[0])}
					/>
					<Typography>Choose Text File</Typography>
					<Button
						type='button'
						variant='contained'
						color='primary'
						className={classes.buttonStyle}
						onClick={(e) => hideMessage()}
					>
						Hide
					</Button>
					<Button onClick={handleGoBack} className={classes.buttonStyle} style={{ marginLeft: 50 }}>
						Back
					</Button>
				</form>
			</div>
		);
}
export default LSBEncryption;
