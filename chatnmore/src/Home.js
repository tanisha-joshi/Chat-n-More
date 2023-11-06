import React from 'react'
import {useState,useEffect} from 'react'
import Axios from "axios"
function Home() {
    const [all,setAll]=useState([]);
    useEffect(() => {
        // Define a function to fetch posts from the server
        const fetchPosts = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/');
            //setPostList(response.data);
            return response?.data;
            
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        // Call the fetchPosts function to fetch posts when the component mounts
        fetchPosts().then(v=>setAll(v));
      }, []); 
      const arr= all.map(item=>{
        return(
           <div> <img src={item.url}/></div>
        )
    })
  return (
    <div>{arr}</div>
  )
}

export default Home