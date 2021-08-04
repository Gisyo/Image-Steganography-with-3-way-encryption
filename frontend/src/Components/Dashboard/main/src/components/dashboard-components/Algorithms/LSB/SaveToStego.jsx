import { Button } from '@material-ui/core';
import React from 'react';

function b64toBlob(b64Data, contentType, sliceSize) {
	contentType = contentType || '';
	sliceSize = sliceSize || 512;

	var byteCharacters = atob(b64Data);
	var byteArrays = [];

	for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
		var slice = byteCharacters.slice(offset, offset + sliceSize);

		var byteNumbers = new Array(slice.length);
		for (var i = 0; i < slice.length; i++) {
			byteNumbers[i] = slice.charCodeAt(i);
		}

		var byteArray = new Uint8Array(byteNumbers);

		byteArrays.push(byteArray);
	}

	var blob = new Blob(byteArrays, { type: contentType });
	return blob;
}

export default function SaveToStegoButton(props) {
	const { photo } = props;

	function saveImage() {
		var test = `data:image/jpeg;base64,${photo}`;
		var block = test.split(';');
		// Get the content type of the image
		var contentType = block[0].split(':')[1]; // In this case "image/gif"
		// get the real base64 content of the file
		var realData = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

		// Convert it to a blob to upload
		var blob = b64toBlob(realData, contentType);

		// Create a FormData and append the file with "image" as parameter name
		var formData = new FormData();
		formData.append('photo', blob);

		var bearer = localStorage.getItem('accessToken');
		fetch('http://127.0.0.1:4000/api/v1/message', {
			method: 'POST',
			body: formData,
			headers: {
				Authorization: `Bearer ${bearer}`,
			},
		})
			.then((res) => res.json())
			.then((response) => {
				console.log(response.status);
				if (response.status === 'success') {
					alert('Successfully Saved');
				}
			})
			.catch((error) => console.log(error));
	}
	return (
		<Button
			onClick={(e) => saveImage()}
			style={{ padding: 10, backgroundColor: 'orange', color: 'white', marginLeft: 30 }}
		>
			Save To Recent
		</Button>
	);
}
