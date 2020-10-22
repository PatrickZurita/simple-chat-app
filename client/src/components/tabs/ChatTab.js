import React from "react";
import ChannelList from "../channels/ChannelList";
import {Cutout, Panel} from "react95";
import MessageList from "../messages/MessageList";
import UserList from "../users/UserList";
import MessageInput from "../messages/MessageInput";
import styled from "styled-components"

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .message-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }
    .window-panel {
        width: 100%;
        min-height: 50vh;
    }
    
`
const ChatTab = ({messages,name,users,sendMessage}) => {
    return (
        <Wrapper>
                <div className ="message-top">
                    <ChannelList/>
                    <Cutout
                        variant={"well"}
                        style={{width:"100%",height:"50vh",overflowY:"auto"}}
                    >
                        <MessageList currentName ={name} messages={messages}/>
                    </Cutout>
                    <UserList users={users}/>
                </div>
                <MessageInput onMessageSent={sendMessage} />
        </Wrapper>

    )
}
export default ChatTab