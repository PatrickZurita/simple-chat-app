import React, {useEffect, useState} from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {useSocket} from "../SocketProvider";

const Dashboard = ({name}) => {
    const [channel, setChannel] = useState('')
    const [messages, setMessages] = useState([])
    const socket = useSocket();
    const appendMessage = (name, body) => {
        setMessages([...messages,{
            timestamp: new Date().toLocaleTimeString("en-US", {
                hour12: true,
                hour: "numeric",
                minute: "numeric",
            }).toLowerCase(),
            senderName: name,
            text: body
        }])
    }
    const sendMessage = (message) => {
        if ( message !== '') {
            socket.emit('send-chat-message',channel, message)
            appendMessage('You',message)
        }
    }
    if (socket !== null) {
        socket.on('user-connected', name => {
            appendMessage('System',`${name} connected`)
        })
        socket.on('user-disconnected', name => {
            appendMessage('System',`${name} disconnected`)
        })
        socket.on('chat-message', data => {
            appendMessage(`${data.name}`,`${data.message}`)
        })
    }
    useEffect(() => {
        setChannel(window.location.pathname.substr(1))
        //Create new User
        if (socket !== null && channel !== '')
            socket.emit('new-user',channel, name)
    },[channel,socket])
    if (channel === '')
        return (
            <h1>Main Page</h1>
        )
    else
        return (
            <div>
                <h1>Welcome to Chat! {name}</h1>
                <MessageList messages={messages}/>
                <MessageInput onMessageSent={sendMessage}/>
            </div>
        )

}

export default Dashboard