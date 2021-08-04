import { Button, Grid, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import Navbar2 from '../Landing/Navbar2';
import SignIn from '../Login/Login';
import img1 from '../Register/default.jpeg';

export default function ImageUploader(props) {
	const { accessToken, name } = props;
	const [ profilePicture, setProfilePicture ] = useState();
	const [ photo, setPhoto ] = useState();
	const [ uploaded, setUploaded ] = useState(false);
	const [ redirectToLogin, setRedirectToLogin ] = useState(false);
	const [ address, setAddress ] = useState();
	const [ education, setEducation ] = useState();
	const [ job, setJob ] = useState();
	const [ phoneNo, setPhoneNo ] = useState();
	const [ website, setWebsite ] = useState();

	function updateUser() {
		const formData = new FormData();
		formData.append('photo', photo);
		formData.append('address', address);
		formData.append('education', education);
		formData.append('job', job);
		formData.append('phoneNo', phoneNo);
		formData.append('website', website);
		fetch('http://127.0.0.1:4000/api/v1/users/updateMe', {
			method: 'PATCH',
			body: formData,
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status === 'success') {
					alert('Successfully Updated');
					setUploaded(true);
					setProfilePicture(response.data.user.photo);
				}
			})
			.catch((error) => console.log(error));
	}

	const goToLogin = (e) => {
		setRedirectToLogin(true);
	};
	const useStyles = makeStyles({
		buttonStyle: {
			paddingLeft: 20,
			paddingRight: 20,
			backgroundColor: '#D8DFFD',
			fontSize: 18,
			fontWeight: 'light',
			border: 'none',
			boxShadow: 'none',
			textAlign: 'left',
			color: 'black',
			'&:hover': {
				backgroundColor: '#ff5722',
				color: 'white',
			},
		},
	});
	const classes = useStyles();

	if (redirectToLogin === true) {
		return <SignIn />;
	}
	else
		return (
			<Grid container xs={12} sm={12}>
				<Grid item xs={0} sm={1} />
				<Grid item xs={12} sm={10}>
					<Navbar2 />
				</Grid>
				<Grid item xs={0} sm={1} />
				<Grid item xs={0} sm={1} />
				<Grid item xs={12} sm={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
					<form noValidate autoComplete='off'>
						<Grid
							item
							xs={12}
							sm={12}
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								marginBottom: 50,
							}}
						>
							<Typography>Hello, {name}. Please update your profile information</Typography>
						</Grid>
						<input
							type='file'
							name='imageFile'
							key='imageFile'
							onChange={(e) => setPhoto(e.target.files[0])}
							style={{ marginLeft: 100 }}
						/>
						<Grid container xs={12} sm={12}>
							<Grid container xs={12} sm={6}>
								{uploaded === true ? (
									<img
										src={profilePicture}
										alt='profilepic'
										style={{ height: 300, width: 'auto', marginLeft: 50, marginTop: 50 }}
									/>
								) : (
									<img
										src={img1}
										alt='profilepic'
										style={{ height: 300, width: 'auto', marginLeft: 50, marginTop: 50 }}
									/>
								)}
							</Grid>
							<Grid container xs={12} sm={6} style={{ marginTop: 70 }}>
								<TextField
									autoComplete='address'
									name='address'
									variant='outlined'
									id='address'
									label='Address'
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									autoFocus
								/>
								<TextField
									autoComplete='education'
									name='education'
									variant='outlined'
									id='education'
									label='Education'
									value={education}
									onChange={(e) => setEducation(e.target.value)}
									autoFocus
									style={{ marginLeft: 50 }}
								/>
								<TextField
									autoComplete='job'
									name='job'
									variant='outlined'
									id='job'
									label='Job'
									value={job}
									onChange={(e) => setJob(e.target.value)}
									autoFocus
								/>
								<TextField
									autoComplete='phoneNo'
									name='phoneNo'
									variant='outlined'
									id='phoneNo'
									label='Phone Number'
									value={phoneNo}
									onChange={(e) => setPhoneNo(e.target.value)}
									autoFocus
									style={{ marginLeft: 50 }}
								/>
								<TextField
									autoComplete='website'
									name='website'
									variant='outlined'
									id='website'
									label='Website'
									value={website}
									onChange={(e) => setWebsite(e.target.value)}
									autoFocus
								/>
							</Grid>
						</Grid>
						<div
							style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}
						>
							<Button
								type='button'
								variant='contained'
								color='primary'
								className={classes.buttonStyle}
								onClick={(e) => updateUser()}
							>
								Update
							</Button>

							<Button variant='contained' color='primary' onClick={goToLogin} style={{ margin: '10vw' }}>
								Go To Login
							</Button>
						</div>
					</form>
				</Grid>
				<Grid item xs={0} sm={1} />
			</Grid>
		);
}
