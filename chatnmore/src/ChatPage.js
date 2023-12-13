import React from 'react'
import { useStateValue } from './StateProvider'
import { Button } from 'flowbite-react';
import { useState,useEffect } from 'react';
import './Chat.css'
import Axios from 'axios'

function ChatPage({socket}) {
    const [{user,sender,receiver},dispatch]=useStateValue();
    const [messages,setMessages]=useState([]);
    const [newMessage,setNewMessage]=useState();
    const [id,setId]=useState('');
    const [socketId,setsocketId]=useState('');
    console.log("user is",user,"sender is",sender,"receiver is",receiver);
    console.log(newMessage);
    useEffect(() => {
        // Define a function to fetch posts from the server
        const fetchMessages = async () => {
          try {
            const response = await Axios.get('http://localhost:3001/getMessages',{params: {sender: sender,receiver:receiver}});
            //setPostList(response.data);
            return response?.data;
            
          } catch (error) {
            console.error('Error fetching messages:', error);
          }
        };
    
        // Call the fetchPosts function to fetch posts when the component mounts
        fetchMessages().then(v=>setMessages(...messages,v));
      }, []); 
    useEffect(() => {
        socket.on('messageResponse', (data) =>setMessages([...messages,data]) );
      }, [socket, messages]);
  
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
          setId(`${socket.id}${Math.random()}`);
          setsocketId(socket.id);
          socket.emit('message', {
            text: newMessage,
            sender: user.email,
            receiver:receiver,
            message_id: `${socket.id}${Math.random()}`,
            socket_id: socket.id,
          });
          Axios
        .post('http://localhost:3001/postMessage',{sender:user.email,receiver:receiver,text:newMessage,message_id:id,socket_id:socketId})
        .then((response) => {
          console.log(response.data);
          console.log("done");
        })
        .catch((error) => {
          console.error(error);
          // Handle errors here if needed
        });
          
        }
        setNewMessage('');
        
       
      };
      // const messageArr=<ul>{messages.map(message=>)}</ul>
     
     console.log(sender,"..",receiver)
  return (
    <div>ChatPage
        <div className="userName">{receiver}</div>
        <div className="message__container">
          {messages.map((message) =>
          message.sender === sender ? (
            <div className="message__chats" key={message.created_at}>
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.created_at}>
              <p className="receiver__name">{message.sender}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>Someone is typing...</p>
        </div>
      </div>
        <div className="newMessageBox">
            <input type='text' value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}></input>
            <Button onClick={(e)=>{handleSendMessage(e)}}>Send</Button>
        </div>
        
    </div>
  )
}

export default ChatPage