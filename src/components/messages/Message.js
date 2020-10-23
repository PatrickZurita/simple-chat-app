import React, {useRef, useState} from "react";
import {StyledMessage} from "./StyledMessage";
import {Button, Tooltip} from "react95";
import styled from "styled-components"

const Delete = styled.div`
    display:${props => props.visible ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin: 0 10px;
    &:hover{
        cursor: pointer;
    }
`
const Message = ({reference,timestamp,senderName,message}) => {
    const isSystemMessage = senderName === 'System'
    const [visibility,setVisibility] = useState(true)
    const [buttonVisible,setButtonVisible] = useState(false)
    const handleDelete = () => {
        setVisibility(false)
    }
    return (
        <StyledMessage
            isSystemMessage
            ref = {reference}
            onMouseEnter = {() => setButtonVisible(!buttonVisible)}
            onMouseLeave = {() => setButtonVisible(!buttonVisible)}
            self={(senderName === 'You')}
            visible = {visibility}
        >
            {   //If the sender is myself or external one
                (senderName === 'You')
                    ? (<p>{`You: ${message} ${timestamp}`}</p>)
                    : (<p>{`${timestamp} ${isSystemMessage ? '' : senderName + ':'} ${message}`}</p>)
            }
            <Delete visible ={buttonVisible} onClick = {e => handleDelete()}>&times;</Delete>
        </StyledMessage>

    )
}

export default Message