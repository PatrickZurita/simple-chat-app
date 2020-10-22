import React, {useEffect, useRef} from "react";
import {Button, Cutout, TextField} from "react95";
import PrivateMessage from "./PrivateMessage";
import styled from "styled-components"
const Wrapper = styled.div`
     width: 80%;  
     .empty {
          width: 100%;
          height: 50vh;
          overflow-y:hidden;
          display: flex;
          justify-content: center;
          align-items: center;
     }
`
const PrivateMessageList = ({allMessages,selectedUser,sendPrivate}) => {

    const input = useRef(null)
    const lastMessageRef = useRef(null)
    useEffect(() => {
        if (lastMessageRef.current)
            lastMessageRef.current.scrollIntoView({smooth: true})
    })
    const handleSubmit = () => {
        let message = input.current.value
        if (message !== '') sendPrivate(selectedUser,message)
        input.current.value = ''
    }
    if (allMessages[selectedUser] !== undefined)
        return (
            <Wrapper>
                <h1>Chat with {selectedUser}</h1>
                <Cutout
                    variant={"well"}
                    style={{width:"100%",height:"39vh",overflowY:"auto",marginBottom:"1vh"}}
                >
                    { allMessages[selectedUser].map((item, i) => {
                        const lastMessage = allMessages[selectedUser].length - 1 === i
                        return (
                            <PrivateMessage
                                reference={lastMessage ? lastMessageRef : null}
                                self={item.self}
                                message={item.message}
                                senderName={selectedUser}
                                timestamp={item.timestamp}
                                key = {i}/>
                        )
                    })}
                </Cutout>
                <div style={{display:"flex"}}>
                    <TextField ref = {input} fullWidth/>
                    <Button onClick={handleSubmit}>Send</Button>
                </div>
            </Wrapper>
        )
    else
        return (
            <Wrapper>
                <Cutout
                    style={{width:"100%",height:"50vh"}}
                >
                    <div
                        className = {"empty"}>
                        <h1>Select a Conversation</h1>
                    </div>

                </Cutout>
            </Wrapper>

        )
}
export default PrivateMessageList