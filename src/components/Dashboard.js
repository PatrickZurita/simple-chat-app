import React, {useCallback, useEffect, useState} from "react";
import {useSocket} from "../contexts/SocketProvider";
import {useLocation} from "react-router-dom"
import {useDispatch} from "react-redux";
import {Button, TabBody, Window, WindowContent, WindowHeader} from 'react95';
import styled from "styled-components"
import TabBar from "./tabs/TabBar";
import ChatTab from "./tabs/ChatTab";
import PrivateTab from "./tabs/PrivateTab";
import getTimeStamp from "../helper/getTimeStamp";
import  { addPrivateMessage } from "../app/features/messages/privateMessageSlice"
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import EditNameTab from "./tabs/EditNameTab";

const Wrapper = styled.div`
    @font-face {
        font-family: 'ms_sans_serif';
        src: url('${ms_sans_serif}') format('woff2');
        font-weight: 400;
        font-style: normal
      }
      @font-face {
        font-family: 'ms_sans_serif';
        src: url('${ms_sans_serif_bold}') format('woff2');
        font-weight: bold;
        font-style: normal
      }
    display: flex;
    flex-direction: column;
    min-width: 50vw;
    font-family: "ms_sans_serif",serif;
    .window-header {
        display:  flex;
        justify-content: space-between;
        align-items: center;
    }
`
const Dashboard = ({name,onNameChange}) => {
    const [channel, setChannel] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [activeTab, setActiveTab] = useState(0)
    const dispatch = useDispatch()
    const socket = useSocket(),{pathname} = useLocation();
    const handleTabChange = (e, value) => {
        setActiveTab(value)
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
        setMessages((currentMessages) => [...currentMessages,buildMessage(name,body)])
    },[setMessages])
    const sendMessage = (message) => {
        if ( message !== '') {
            socket.emit('send-chat-message',channel, message)
            appendMessage('You',message)
        }
    }
    const sendPrivateMessage = (recipient,message) => {
        if (message !== '') {
            socket.emit('send-private-message',name,recipient,message)
            dispatch(addPrivateMessage({sender:name, recipient:recipient, message:message,self:true}))
        }
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
        // eslint-disable-next-line
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
        // eslint-disable-next-line
    },[pathname])

    const renderSwitch = (active) => {
        switch (active) {
            case 0:
                return <ChatTab
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
            case 2:
                return <EditNameTab
                            onNameChange = {onNameChange}
                            currentName = {name}
                       />
            default: return null
        }
    }
    return (
        <Wrapper>
            <Window>
                <WindowHeader className = "window-header">
                    Welcome {name}, to the best! chat app
                    <Button onClick={()=> {window.location.href = '/'}}>
                        &times;
                    </Button>
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