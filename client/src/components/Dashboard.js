import React, {useEffect, useState} from "react";
import {useSocket} from "../contexts/SocketProvider";
import {useLocation} from "react-router-dom"
import {
    Tabs,
    Tab,
    TabBody,
    Window,
    WindowHeader,
    Panel,
    WindowContent,
    Fieldset,
    NumberField,
    Checkbox
} from 'react95';
import styled from "styled-components"
import capitalize from "../helper/capitalize";
import TabBar from "./tabs/TabBar";
import ChannelTab from "./tabs/ChannelTab";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 60vw;
`
const Dashboard = ({name}) => {
    const [channel, setChannel] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [activeTab, setActiveTab] = useState(0)

    const socket = useSocket(),{pathname} = useLocation();
    const handleTabChange = (e, value) => setActiveTab(value)
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
    const addUser = (name) => setUsers([...users, name])
    const removeUser = (name) => {
        let index = users.indexOf(name)
        setUsers(users.splice(index,1))
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
            addUser(name)
        })
        socket.on('user-disconnected', name => {
            appendMessage('System',`${name} disconnected`)
            removeUser(name)
        })
        socket.on('chat-message', data => {
            appendMessage(`${data.name}`,`${data.message}`)
        })
    }
    useEffect(() => {
        //Create new User
        if (socket !== null && channel !== '') {
            socket.emit('new-user',channel, name)
        }
    },[channel, name, socket])
    useEffect(() => {
        setChannel(pathname.substr(1))
        setMessages([])
        appendMessage(`System`, `Joined ${pathname.substr(1)} chat!`)
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
            case 1: return <h1>fasfa</h1>;
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