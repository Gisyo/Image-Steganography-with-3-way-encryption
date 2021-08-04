import { Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import Cards from './cards';


export default function FetchImages(){
    const [data, setData] = useState([]);
    useEffect(() => {
        var bearer = localStorage.getItem('accessToken');
        fetch('http://127.0.0.1:4000/api/v1/message', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        })
          .then((res) => res.json())
          .then((response) =>  {
            setData(response.data);                      
            }            
          )
          .catch((error) => console.log(error));
      }, []);  
      console.log(data); 
     
    return(<>
        {data.map((datum) => {
          return(<>
          <Typography variant="h5" >Recent Images</Typography>
          {datum.images.map((img) => {
            //console.log(img);
            
            var url = 'http://127.0.0.1:4000/api/v1/message/stego?stego=' + img.stego;
            console.log(url);
            return(<Grid container xs={12} sm={4} style={{display:'flex',justifyContent:'center', alignItems:'center', marginTop: -50, marginBottom:70, marginLeft:100}}>
                      
                      <Cards url={url}  />
                   </Grid>);
              
          })}
          </>)
        })}
        </>
)
}