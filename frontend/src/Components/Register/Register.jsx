import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Navbar2 from '../Landing/Navbar2';
import ImageUploader from './ImageUploader';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignUp() {
	const classes = useStyles();
	const [ name, setName ] = React.useState();
	const [ redirectToLogin, setRedirectToLogin ] = React.useState(false);
	const [ email, setEmail ] = React.useState();
	const [ password, setPassword ] = React.useState();
	const [ passwordconfirmed, setPasswordconfirmed ] = React.useState();
	const [ accessToken, setAccessToken ] = React.useState();

	function signup() {
		fetch('http://127.0.0.1:4000/api/v1/users//signup', {
			method: 'POST',
			headers: {
				Accept: '*/*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': '*',
			},
			body: JSON.stringify({
				name: name,
				email: email,
				password: password,
				passwordconfirmed: passwordconfirmed,
			}),
		})
			.then((Response) => Response.json())
			.then((Result) => {
				console.log('Result=' + JSON.stringify(Result));
				if (Result.status === 'success') {
					alert('Successfully Registered, Continue to update profile');
					setRedirectToLogin(true);
					setAccessToken(Result.token);
				}
				else alert(Result.message);
			});
	}

	const handleKeypress = (event) => {
		return (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122);
	};

	if (redirectToLogin === true) {
		return <ImageUploader accessToken={accessToken} name={name} />;
	}
	return (
		<Grid container>
			<Grid xs={0} sm={1} />
			<Grid xs={12} sm={10}>
				<Navbar2 />
				<Container component='main' maxWidth='xs' style={{ marginTop: -50 }}>
					<CssBaseline />
					<div className={classes.paper}>
						<Avatar className={classes.avatar}>
							<LockOutlinedIcon />
						</Avatar>
						<Typography component='h1' variant='h5'>
							Sign up
						</Typography>
						<form className={classes.form} noValidate>
							<Grid container spacing={2}>
								<Grid item xs={12} sm={12}>
									<TextField
										autoComplete='name'
										type='text'
										onKeyPress={handleKeypress}
										name='Name'
										variant='outlined'
										required
										fullWidth
										id='firstName'
										label='Name'
										value={name}
										onChange={(e) => setName(e.target.value)}
										autoFocus
									/>
								</Grid>
								{/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										id='email'
										label='Email Address'
										name='email'
										autoComplete='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										name='password'
										label='Password'
										type='password'
										id='password'
										autoComplete='current-password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant='outlined'
										required
										fullWidth
										name='password'
										label='ConfirmPassword'
										type='password'
										id='password'
										autoComplete='current-password'
										value={passwordconfirmed}
										onChange={(e) => setPasswordconfirmed(e.target.value)}
									/>
								</Grid>
								{/* <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid> */}
							</Grid>
							<Button
								type='button'
								fullWidth
								variant='contained'
								color='primary'
								className={classes.submit}
								onClick={(e) => signup()}
							>
								Next
							</Button>
							<Grid container justify='flex-end'>
								<Grid item>
									<Link to='/SignIn' href='#' variant='body2'>
										Already have an account? Sign in
									</Link>
								</Grid>
							</Grid>
						</form>
					</div>
				</Container>
			</Grid>
			<Grid xs={0} sm={1} />
		</Grid>
	);
}
