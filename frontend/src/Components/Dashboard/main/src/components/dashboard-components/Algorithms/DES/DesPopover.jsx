import { Button, Card, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const DesPopover = (props) => {
	const {
		originalSize,
		originalText,
		encryptedSize,
		encryptedText,
		handleClose,
		decryptedText,
		decryptedTextSize,
		encryptedTextSize,
		des,
	} = props;

	const useStyles = makeStyles({
		popoverStyle: {
			backgroundColor: '#2196f3',
			color: 'white',
			height: 400,
			width: 500,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		infoStyle: {
			marginTop: '20px',
			width: '90%',
			margin: 'auto',
		},
		buttonStyle: {
			marginTop: 20,
			marginLeft: '40%',
			color: 'white',
			backgroundColor: '#f06292',
		},
	});
	const classes = useStyles();

	if (des === true) {
		return (
			<Card className={classes.popoverStyle}>
				<div style={{ display: 'block', textAlign: 'center' }}>
					<Typography className={classes.infoStyle}>
						<span style={{ fontWeight: 'bolder' }}>Encrypted Text: </span>
						{encryptedText}
					</Typography>
					<Typography className={classes.infoStyle}>
						<span style={{ fontWeight: 'bolder' }}>Encrypted Size: </span>
						{encryptedSize}
					</Typography>
					<Typography className={classes.infoStyle}>
						<span style={{ fontWeight: 'bolder' }}>Original Text: </span>
						{originalText}
					</Typography>
					<Typography className={classes.infoStyle}>
						<span style={{ fontWeight: 'bolder' }}>Original Size: </span>
						{originalSize}
					</Typography>
					<Button onClick={handleClose} style={{ marginTop: 10, backgroundColor: 'orange', color: 'white' }}>
						close
					</Button>
				</div>
			</Card>
		);
	}
	return (
		<Card className={classes.popoverStyle}>
			<div style={{ display: 'block', textAlign: 'center' }}>
				<Typography className={classes.infoStyle}>
					<span style={{ fontWeight: 'bolder' }}>Decrypted Text: </span>
					{decryptedText}
				</Typography>
				<Typography className={classes.infoStyle}>
					<span style={{ fontWeight: 'bolder' }}>Decrypted Text Size: </span>
					{decryptedTextSize}
				</Typography>
				<Typography className={classes.infoStyle}>
					<span style={{ fontWeight: 'bolder' }}>Encrypted Text: </span>
					{encryptedText}
				</Typography>
				<Typography className={classes.infoStyle}>
					<span style={{ fontWeight: 'bolder' }}>Encrypted Text Size: </span>
					{encryptedTextSize}
				</Typography>
				<Button onClick={handleClose} style={{ marginTop: 10, backgroundColor: 'orange', color: 'white' }}>
					close
				</Button>
			</div>
		</Card>
	);
};

export default DesPopover;
