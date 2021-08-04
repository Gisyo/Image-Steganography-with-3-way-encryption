import React from 'react';

export default function Cardui(props){
    const {src} = props;
    console.log(src);
    return(
        <img src={src} alt='pics' style={{height:300}} />
    )
 }