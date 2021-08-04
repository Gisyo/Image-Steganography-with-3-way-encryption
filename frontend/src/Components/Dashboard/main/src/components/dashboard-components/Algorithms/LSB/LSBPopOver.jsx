import { Button, Typography } from '@material-ui/core';
import React from 'react';
import SaveToStegoButton from './SaveToStego';

const LSBPopOver = (props) => {
	const { img, handleClose, text, imageSent } = props;

	if (imageSent === true) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
				<div style={{ display: 'block', alignItems: 'center', textAlign: 'center' }}>
					<img
						src={`data:image/jpeg;base64,${img}`}
						alt='popover'
						style={{ height: '460px', width: 'auto' }}
					/>
					<div
						style={{
							diaplay: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							marginTop: 10,
							textAlign: 'center',
						}}
					>
						<Button
							onClick={handleClose}
							style={{ padding: 10, backgroundColor: 'orange', color: 'white' }}
						>
							close
						</Button>
						<SaveToStegoButton photo={img} />
						<Typography style={{ marginTop: 10 }}>
							Saved to C:\Program Files\Apache Software Foundation\Tomcat 9.0\bin{' '}
						</Typography>
					</div>
				</div>
			</div>
		);
	}
	else
		return (
			<div style={{ height: 200, width: 300, backgroundColor: '#2196f3', color: 'white' }}>
				<Typography style={{ marginLeft: 25, marginTop: 25 }}>Decrypted Text: {text}</Typography>
				<div
					style={{
						diaplay: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginLeft: '40%',
						marginTop: '25%',
					}}
				>
					<Button onClick={handleClose} style={{ backgroundColor: 'orange', color: 'white' }}>
						close
					</Button>
				</div>
			</div>
		);
};

export default LSBPopOver;
