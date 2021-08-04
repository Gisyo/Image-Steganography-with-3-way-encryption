import { Grid } from '@material-ui/core';
import React from 'react';
import { Card, Button } from 'reactstrap';

function Cards(props) {
	const { url } = props;
	const download = (props) => {
		var element = document.createElement('a');
		var file = new Blob([ url ], { type: 'image/*' });
		element.href = URL.createObjectURL(file);
		element.download = 'image.jpg';
		element.click();
	};
	return (
		<Grid xs={6} sm={3}>
			<Card style={{ width: 300, height: 'auto' }}>
				<img src={url} alt='img' style={{ width: '100%', height: 'auto' }} />
				<Button onClick={() => download()} style={{ width: '100%', height: 'auto' }}>
					Download
				</Button>
			</Card>
		</Grid>
	);
}

export default Cards;
