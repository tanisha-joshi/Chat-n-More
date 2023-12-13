import React from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import Axios from 'axios'
import { Button,ListGroup } from 'flowbite-react'
import './Chat.css';
const Chat = ({ socket}) => {
    const [{user,sender,receiver},dispatch]=useStateValue();
    const [users,setUsers]=useState([]);
    const[receive,setReceive]=useState('');
    let navigate=useNavigate();
    useEffect(() => {
        // Define a function to fetch posts from the server
        const fetchUsers = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/fetchUsers?uid='+user.uid);
            //setPostList(response.data);
            console.log(response?.data);
            return response?.data;
            
          } catch (error) {
            console.error('Error fetching posts:', error);
          }
        };
    
        // Call the fetchPosts function to fetch posts when the component mounts
        fetchUsers().then(v=>setUsers(v));
      }, []);
      const renderChatPage=(item)=>{
        console.log("item is",item);
        dispatch({
            type: 'SET_Sender',
            sender: user.email,
          })
          dispatch({
            type: 'SET_Receiver',
            receiver: item.email,
          })
          navigate('/chatPage');
      }
      const arr=<div class="w-full flex justify-center">
      <ListGroup class="w-full">
        {
          users.map(item=>{
                return(
                  <ListGroup.Item onClick={()=>renderChatPage(item)}>{item.email}</ListGroup.Item>
                )
            })
          }
          
      </ListGroup>
    </div>
    //   const arr=<ul>{ users.map(item=>{
    //     return(
        
    //        <li> <Button onClick={()=>renderChatPage(item)}>{item.email}</Button></li>
        
    //     )
    // })}</ul>
  return (
    <div className="chat mt-5">
        <div class="text-2xl italic">Users</div>
        {arr}
      
    </div>
  );
};

export default Chat;