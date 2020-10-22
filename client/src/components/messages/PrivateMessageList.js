import React, {useEffect, useRef} from "react";
import {Button, Cutout, TextField} from "react95";
import PrivateMessage from "./PrivateMessage";
import styled from "styled-components"
const Wrapper = styled.div`
     width: 80%;  
`
const PrivateMessageList = ({allMessages,selected,sendPrivate}) => {

    const input = useRef(null)
    const lastMessageRef = useRef(null)
    useEffect(() => {
        if (lastMessageRef.current)
            lastMessageRef.current.scrollIntoView({smooth: true})
    })
    const handleSubmit = () => {
        let message = input.current.value
        if (message !== '') sendPrivate(selected,message)
        input.current.value = ''
    }
    if (allMessages[selected] !== undefined)
        return (
            <Wrapper>
                <Cutout
                    variant={"well"}
                    style={{width:"100%",height:"50vh",overflowY:"auto"}}
                >
                    { allMessages[selected].map((item,i) => {
                        const lastMessage = allMessages[selected].length - 1 === i
                        return (
                            <PrivateMessage
                                reference={lastMessage ? lastMessageRef : null}
                                self={item.self}
                                message={item.message}
                                senderName={selected}
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
            <h1>Select a Conversation</h1>
        )
}
export default PrivateMessageList