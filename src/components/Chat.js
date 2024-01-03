import React, { useEffect, useState } from 'react'
import {addDoc,collection,serverTimestamp,onSnapshot, query,where, orderBy} from 'firebase/firestore'
import { auth, db } from '../firebase-config'
import '../styles/Chat.css'

const Chat = (props) => {
    const {room}=props

const [newMessage,setNewMessage]=useState("")
const [message,setMessage]=useState([])
const messageRef=collection(db,"messages")

useEffect(()=>{
    const queryMessages=query(messageRef,where("room","==",room),orderBy("createdAt"))
   const unscribe= onSnapshot(queryMessages,(snapshot)=>{
    let message=[];
snapshot.forEach((doc)=>{
    message.push({...doc.data(), id:doc.id})
});
setMessage(message);
});
return()=>unscribe();
},[])

const handleSubmit= async(e)=>{
    e.preventDefault()
    if(newMessage==="") return;

    await addDoc(messageRef,{
        text:newMessage,
        createdAt:serverTimestamp(),
        user:auth.currentUser.displayName,
        room,
    });

    setNewMessage("")
}

  return (
    <div className='chat-app' >
        <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>
      <div className="messages">
        {message.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
        <form onSubmit={handleSubmit} className='new-message-form'>
        <input className='new-message-input'
        placeholder='Type-your-message-here..'
        onChange={(e)=>setNewMessage(e.target.value)}
        value={newMessage}
        />
        <button type='submit' className='send-button'>Send</button>    
        </form>
    </div>
  )
}

export default Chat