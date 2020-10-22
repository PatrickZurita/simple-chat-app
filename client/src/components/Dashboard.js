import React, {useCallback, useEffect, useState} from "react";
import {useSocket} from "../contexts/SocketProvider";
import {useLocation} from "react-router-dom"
import {useDispatch} from "react-redux";
import {TabBody, Window, WindowContent, WindowHeader} from 'react95';
import styled from "styled-components"
import capitalize from "../helper/capitalize";
import TabBar from "./tabs/TabBar";
import ChannelTab from "./tabs/ChannelTab";
import PrivateTab from "./tabs/PrivateTab";
import  { addPrivateMessage } from "../app/features/messages/privateMessageSlice"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 50vw;
`
const Dashboard = ({name}) => {
    const [channel, setChannel] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [activeTab, setActiveTab] = useState(0)
    const dispatch = useDispatch()
    const socket = useSocket(),{pathname} = useLocation();

    const handleTabChange = (e, value) => setActiveTab(value)
    const getTimeStamp = () =>{
        return new Date().toLocaleTimeString("en-US", {
            hour12: true,
            hour: "numeric",
            minute: "numeric",
        }).toLowerCase()
    }
    const buildMessage = (senderName,message) => {
        return {
            timestamp: getTimeStamp(),
            senderName: senderName,
            message: message
        }
    }
    const addUser = (name) => setUsers([...users, name])
    const removeUser = (name) => {
        let index = users.indexOf(name)
        setUsers(users.splice(index,1))
    }
    const appendMessage = useCallback((name, body) => {
        setMessages([...messages,buildMessage(name,body)])
    },[messages])
    const sendMessage = (message) => {
        if ( message !== '') {
            socket.emit('send-chat-message',channel, message)
            appendMessage('You',message)
        }
    }
    const sendPrivateMessage = (id,message) => {
        if (message !== '') socket.emit('send-private-message',id,message)
    }
    useEffect(() => {
        if (socket !== null) {
            socket.on('user-connected', name => {
                appendMessage('System',`${name} connected`)
                addUser(name)
            })
            socket.on('user-disconnected', name => {
                appendMessage('System',`${name} disconnected`)
                removeUser(name)
            })
            socket.on('chat-message', data => {
                appendMessage(`${data.name}`,`${data.message}`)
            })
            socket.on('receive-private-message', data => {
                dispatch(addPrivateMessage(data))
            })
        }
    },[socket])
    useEffect(() => {
        //Create new User
        if (socket !== null && channel !== '') {
            socket.emit('new-user',channel, name)
        }
    },[channel, name, socket])
    useEffect(() => {
        setChannel(pathname.substr(1))
        setMessages([])
        if (socket == null) return
        socket.emit('unsubscribe',{channel:channel,name:name})
    },[pathname])

    const renderSwitch = (active) => {
        switch (active) {
            case 0:
                return <ChannelTab
                            messages = {messages}
                            channel = {channel}
                            name = {name}
                            users = {users}
                            sendMessage = {sendMessage}
                       />;
            case 1:
                return <PrivateTab
                            sendPrivate = {sendPrivateMessage}
                       />;
            default: return null
        }
    }
    return (
        <Wrapper>
            <Window>
                <WindowHeader className = "window-header">
                    Welcome {name}, to {capitalize(channel)} chat channel
                </WindowHeader>
                <WindowContent>
                    <TabBar
                        selectedTab = {activeTab}
                        handleTabClick = {handleTabChange}
                    />
                    <TabBody>
                        {renderSwitch(activeTab)}
                    </TabBody>
                </WindowContent>
            </Window>
        </Wrapper>
    )
}

export default Dashboard