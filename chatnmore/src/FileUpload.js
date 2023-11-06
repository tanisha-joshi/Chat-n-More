import React from 'react'
import {useState} from 'react'
import { FileInput, Label } from 'flowbite-react';
import {useEffect} from 'react'
import Axios from "axios"
import {useStateValue} from './StateProvider'
// import {auth} from './firebase.js' 
// const user = auth.currentUser;
// if (user) {
//   const displayName = user.displayName;
//   console.log(`User's display name: ${displayName}`);
// }
function FileUpload() {
  const [{user},dispatch]=useStateValue();
  console.log("user is from fileupload")
  console.log(user.uid);
  const uid=user.uid;
  useEffect(() => {
    // Define a function to fetch posts from the server
    const fetchPosts = async () => {
      try {
        const response = await Axios.get('http://localhost:3001/displayPost?uid='+user.uid);
        //setPostList(response.data);
        console.log("postlist is",postList);
        return response?.data;
        
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Call the fetchPosts function to fetch posts when the component mounts
    fetchPosts().then(v=>setPostList(v));
  }, []); 
    const [post,setUserPost]=useState(null);
    const [postList,setPostList]=useState([]);
    const [caption,setCaption]=useState("");
    let url;
    // const changeCaption=(e)=>{
    //   setUserPost({caption:{},image: {post.image}})
    // }
    const handleChange=(e)=>{
        setUserPost(URL.createObjectURL(e.target.files[0]));
        console.log(post);
    }
    const handleCaption=(e)=>{
      setCaption(e.target.value);
      console.log(caption);
    }
    const arr= postList.map(item=>{
        return(
           <div> <img src={item.url}/></div>
        )
    })
    


    const insertPost=(e)=>{
        e.preventDefault();
         Axios
        .post('http://localhost:3001/post',{uid:user.uid,url:{post},caption:caption})
        .then((response) => {
          console.log(response.data);
          console.log("done");
          setPostList([post,...postList]);
          console.log("postlist is",postList);
          // Handle the response here if needed
        })
        .catch((error) => {
          console.error(error);
          // Handle errors here if needed
        });
        // Axios.get("http:localhost:3001/post",{
        //   url:post
        // }).then((response) => {
        //   if(response)
        //   {
        //     setPostList([post,...postList]);
        //   }
        // })
          
        }
    
    
  return (
    <div
      className="max-w-md"
      id="fileUpload"
    >
      <form method='POST'>
      <div className="mb-2 block">
        <Label
          htmlFor="file"
          value="Upload file"
        />
      </div>
      <FileInput
        helperText="Choose images you want to post"
        id="file" onChange={handleChange}
      />
      </form>
       <input type="message" placeholder="Enter Caption" value={caption} onChange={handleCaption} ></input> 
      <button onClick={insertPost}>Add Post</button>
      {arr}

      </div>
  )
}

export default FileUpload