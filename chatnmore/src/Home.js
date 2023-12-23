import React from 'react'
import {useState,useEffect} from 'react'
import Axios from "axios"
import {Button,TextInput} from 'flowbite-react'
import { FaHeart } from "react-icons/fa";
import { useStateValue } from './StateProvider';
import {auth} from './firebase.js';
import url from './image.jpg'

function Home() {
    const [like,setLike]=useState(false);
    const [{user},dispatch]=useStateValue();
    const [all,setAll]=useState([]);
    const [view,setView]=useState(false);
    const [comments,setComments]=useState([]);
    const [curritem,setitem]=useState({});
    const [viewBox,setviewBox]=useState(false);
    const [newComment,setnewComment]=useState('');
    const currentTimestamp = new Date().toString().slice(15,24);
    const newDate= new Date().toLocaleDateString('en-ZA');
    let date='';
    date+=(newDate+' '+currentTimestamp);
    
    const renderComments=(item)=>{
            
            const fetchComments = async () => {
              try {
                console.log(item);
                const utcTimestamp = item.created_at;
                const utcDate = new Date(utcTimestamp);
                const istOptions = { timeZone: 'Asia/Kolkata', timeZoneName: 'short',hour12: false };
                const istDate = utcDate.toLocaleString('en-US', istOptions);
                console.log(istDate);
                console.log("ist date is",istDate);
                const dateString = istDate;
                let newDate="";
                let i=0;
                while(dateString[i]!=='G')
                {
                  if(dateString[i]===',') i++;
                  newDate+=dateString[i];
                  i++;
                }
                // newDate=dateString.slice(5,10)+'/'+dateString.slice(0,2)+'/'+dateString.slice(3,5)+' '+dateString.slice(12,19);
                let datePart="";
                i=0;
                while(newDate[i]!=' ')
                {
                  datePart+=newDate[i];
                  i++;
                }
                let parts = datePart.split('/');
                
                let day = parts[1];
                let month = parts[0];
                let year = parts[2];
                if(day.length===1) day='0'+day;
                if(month.length===1) month='0'+month;
                datePart=year+'/'+month+'/'+day;
                while(i<newDate.length)
                {
                  datePart+=newDate[i]; i++;
                }
                console.log("Time of post to be deleted",datePart);
                console.log("created at is",item.created_at);
                
                const response = await Axios.get('http://localhost:3001/comments',{params: {uid: item.uid,created_at:datePart}});
                //setPostList(response.data);
                return response?.data;
                
              } catch (error) {
                console.error('Error fetching posts:', error);
              }
            }
        
            // Call the fetchPosts function to fetch posts when the component mounts
            fetchComments().then(v=>setComments(v));
            // set a timer for 2 ms
            setTimeout(() => {
              // execute the second instruction
              console.log("World");
            }, 200);
            view===false? setView(true):setView(false);
            setitem(item);
            console.log("comments ar" ,comments);
            console.log("view is", view);
    }
    const insertComment=(e)=>{
      e.preventDefault();
      
      const utcTimestamp = curritem.created_at;
      const utcDate = new Date(utcTimestamp);
      const istOptions = { timeZone: 'Asia/Kolkata', timeZoneName: 'short',hour12: false };
      const istDate = utcDate.toLocaleString('en-US', istOptions);
      console.log(istDate);
      console.log("ist date is",istDate);
      const dateString = istDate;
      let newDate="";
      let i=0;
      while(dateString[i]!=='G')
      {
        if(dateString[i]===',') i++;
        newDate+=dateString[i];
        i++;
      }
      // newDate=dateString.slice(5,10)+'/'+dateString.slice(0,2)+'/'+dateString.slice(3,5)+' '+dateString.slice(12,19);
      let datePart="";
      i=0;
      while(newDate[i]!=' ')
      {
        datePart+=newDate[i];
        i++;
      }
      let parts = datePart.split('/');
      
      let day = parts[1];
      let month = parts[0];
      let year = parts[2];
      if(day.length===1) day='0'+day;
      if(month.length===1) month='0'+month;
      datePart=year+'/'+month+'/'+day;
      while(i<newDate.length)
      {
        datePart+=newDate[i]; i++;
      }
      console.log("Time of post to be deleted",datePart);
      // console.log("created at is",item.created_at);
       Axios
      .post('http://localhost:3001/insertComment',{uid:curritem.uid,created_at:datePart,message:newComment})
      .then((response) => {
        console.log(response.data);
        console.log("done");
       setnewComment('');
        // Handle the response here if needed
      })
      .catch((error) => {
        console.error(error);
        // Handle errors here if needed
      });
    }
   const AddComments=()=>{
    viewBox===false? setviewBox(true): setviewBox(false);
    console.log(newComment);
   }
    useEffect(() => {
        // Define a function to fetch posts from the server
        const fetchPosts = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/',{params: {uid: user.uid}});
            //setPostList(response.data);
            return response?.data;
            
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        // Call the fetchPosts function to fetch posts when the component mounts
        fetchPosts().then(v=>setAll(v));
      }, [like]); 
      
      const handleClick=(item)=>{
        const utcTimestamp = item.created_at;
                const utcDate = new Date(utcTimestamp);
                const istOptions = { timeZone: 'Asia/Kolkata', timeZoneName: 'short',hour12: false };
                const istDate = utcDate.toLocaleString('en-US', istOptions);
                console.log(istDate);
                console.log("ist date is",istDate);
                const dateString = istDate;
                let newDate="";
                let i=0;
                while(dateString[i]!=='G')
                {
                  if(dateString[i]===',') i++;
                  newDate+=dateString[i];
                  i++;
                }
                // newDate=dateString.slice(5,10)+'/'+dateString.slice(0,2)+'/'+dateString.slice(3,5)+' '+dateString.slice(12,19);
                let datePart="";
                i=0;
                while(newDate[i]!=' ')
                {
                  datePart+=newDate[i];
                  i++;
                }
                let parts = datePart.split('/');
                
                let day = parts[1];
                let month = parts[0];
                let year = parts[2];
                if(day.length===1) day='0'+day;
                if(month.length===1) month='0'+month;
                datePart=year+'/'+month+'/'+day;
                while(i<newDate.length)
                {
                  datePart+=newDate[i]; i++;
                }
                console.log("Time of post to be deleted",datePart);
          console.log(item.isLiked);
          if(item.isLiked==='0'){
            Axios
            .post('http://localhost:3001/addLike',{uid:user.uid,created_at:datePart})
            .then((response) => {
              console.log(response.data);
              console.log("done");
              setLike(!like);
              // Handle the response here if needed
            })
            .catch((error) => {
              console.error(error);
              // Handle errors here if needed
            });
            Axios
            .post('http://localhost:3001/likes',{created_at:datePart})
            .then((response) => {
              console.log(response.data);
              console.log("done");
              // Handle the response here if needed
            })
            .catch((error) => {
              console.error(error);
              // Handle errors here if needed
            });
          }
          else{
            Axios
            .post('http://localhost:3001/unLike',{uid:user.uid,created_at:datePart})
            .then((response) => {
              setLike(!like);
              console.log(response.data);
              console.log("done");
              // Handle the response here if needed
            })
            .catch((error) => {
              console.error(error);
              // Handle errors here if needed
            });
            Axios
            .post('http://localhost:3001/removeLike',{created_at:datePart})
            .then((response) => {
              console.log(response.data);
              console.log("done");
              // Handle the response here if needed
            })
            .catch((error) => {
              console.error(error);
              // Handle errors here if needed
            });
          }
          
      }
      
    
        // Call the fetchPosts function to fetch posts when the component mounts
        // fetchLiked().then(v=>(truth=v[0].isTrue));
        // set a timer for 2 ms

      const arr= all.map(item=>{
        return(
           <div class="ml-2"> 
           <figure class="max-w-lg">
              <img class="h-auto w-full rounded-lg" src={item.url} alt="image description" />
              <figcaption class="mt-2 text-l text-center text-gray-900 dark:text-gray-400"><p class="text-xl font-medium text-gray-900 dark:text-white">{item.caption}</p></figcaption>
              <figcaption class="mt-2 text-xs text-left text-gray-700 dark:text-gray-600"><span class="italic">Posted by-{item.uid}</span></figcaption>
              <figcaption class="mt-2 text-xs text-left text-gray-700 dark:text-gray-600"><span class="italic">Posted on-{item.created_at}</span></figcaption>
            </figure>
            
           <div><FaHeart color='black'  style={{ fill: item.isLiked===user.uid ? 'black' : 'none', cursor: 'pointer',stroke: item.isLiked===user.uid  ? 'none' : 'black',strokeWidth: item.isLiked===user.uid  ? 0 : 40 }} onClick={()=>handleClick(item)}/>
           <figcaption class="mt-2 text-xs text-left text-gray-900 font-bold dark:text-gray-600"><span class="italic">{item.likes}&nbsp;Likes</span></figcaption>
           </div>
           <br />
           <div align="left">
           <button type="button" class="text-white bg-gradient-to-r from-pink-600 via-pink-700 to-pink-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"onClick={()=> renderComments(item)}>View comments</button>
           </div>
           {curritem===item? view&&<div align="left">{comments.map(comment=>(<div class="flex flex-col"><p class="text-xs font-bold text-gray-900 dark:text-white">
           <p class="text-xs font-medium text-gray-900 dark:text-white">{comment.uid} &nbsp; commented:</p><span class="italic">{comment.comment}</span></p>
                    </div>))} <br /><Button color='green' onClick={()=> AddComments()} >Add Comments</Button><br /></div>:''}
           {curritem===item? viewBox&& <div><TextInput value={newComment} onChange = {e => setnewComment(e.target.value)} ></TextInput><Button color="orange" onClick={(e)=>insertComment(e)}>Post comment</Button><br /></div>  :''}

           </div>
        )
    })
    
  return (
    <>
    <p class="text-l font-bold text-gray-900 text-right font-extralight dark:text-white">{date}</p>
    <br />
    <div>{arr}</div>
    </>
  )
}


export default Home;