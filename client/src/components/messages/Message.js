import React from "react";
import {StyledMessage} from "./StyledMessage";



const Message = ({reference,timestamp,senderName,message}) => {
    const isSystemMessage = senderName === 'System'
    if (senderName === 'You')
        return (
            <StyledMessage isSystemMessage ref = {reference} self>
                <p>{`You: ${message} ${timestamp}`}</p>
            </StyledMessage>
        )
    return (
        <StyledMessage isSystemMessage ref = {reference}>
            <p>{`${timestamp} ${isSystemMessage ? '' : senderName + ':'} ${message}`}</p>
        </StyledMessage>
    )
}

export default Message