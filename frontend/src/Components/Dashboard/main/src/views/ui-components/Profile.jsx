import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState, useEffect } from 'react';
import { Card, CardTitle } from 'reactstrap';

const Profile = () => {
	const [ name, setName ] = useState();
	const [ email, setEmail ] = useState();
	const [ photo, setPhoto ] = useState();
	const [ address, setAddress ] = useState();
	const [ job, setJob ] = useState();
	const [ education, setEducation ] = useState();
	const [ phoneNo, setPhoneNo ] = useState();
	const [ website, setWebsite ] = useState();

	useEffect(() => {
		var bearer = localStorage.getItem('accessToken');
		fetch('http://127.0.0.1:4000/api/v1/users/Profile', {
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		})
			.then((res) => res.json())
			.then((response) => {
				setName(response.data.name);
				setEmail(response.data.email);
				setPhoto(response.data.photo);
				setJob(response.data.job);
				setEducation(response.data.education);
				setAddress(response.data.address);
				setPhoneNo(response.data.phoneNo);
				setWebsite(response.data.website);
			})
			.catch((error) => console.log(error));
	}, []);

	const useStyles = makeStyles({
		ppStyle: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: -130,
		},
		editIcon: {
			fontSize: 15,
		},
		userDetails: {
			fontSize: 18,
			padding: 10,
		},
		socialMedia: {
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			padding: 50,
		},
		socialmediaIcon: {
			fontSize: 70,
			color: '#2196f3',
			marginLeft: 100,
		},
	});
	const classes = useStyles();
	return (
		<div>
			<Card style={{ marginTop: -70, width: 1055, height: 530 }}>
				<CardTitle className='bg-light border-bottom p-3 mb-0'>
					<i className='mdi mdi-account-circle mr-2'> </i>
					Profile
				</CardTitle>
				<Grid container xs={12} sm={12}>
					<Grid item sm={4} className={classes.ppStyle}>
						<img src={photo} alt='pp' style={{ height: 200, width: 200 }} />
					</Grid>
					<Grid container sm={8} style={{ marginTop: 50 }}>
						<Grid sm={1} />
						<Grid sm={10}>
							<Typography variant='h5' className={classes.userDetails}>
								Name: {name}
							</Typography>
							<Typography variant='h5' className={classes.userDetails}>
								Job: {job}
							</Typography>
							<Typography variant='h5' className={classes.userDetails}>
								Email: {email}
							</Typography>
							<Typography variant='h5' className={classes.userDetails}>
								Education: {education}
							</Typography>
							<Typography variant='h5' className={classes.userDetails}>
								Address: {address}
							</Typography>
							<Typography variant='h5' className={classes.userDetails}>
								Phone Number: {phoneNo}
							</Typography>
							<Typography variant='h5' className={classes.userDetails}>
								Website: {website}
							</Typography>
						</Grid>
						<Grid sm={1} />
						<Grid sm={1} />
						{/*<Grid sm={10} className={classes.socialMedia}>
							<FacebookIcon className={classes.socialmediaIcon} />
							<LinkedInIcon className={classes.socialmediaIcon} />
							<TwitterIcon className={classes.socialmediaIcon} />
						</Grid>*/}
						<Grid sm={1} />
					</Grid>
				</Grid>
			</Card>
		</div>
	);
};

export default Profile;
