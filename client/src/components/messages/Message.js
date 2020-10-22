import React from "react";
import styled from "styled-components";

const StyledMessage = styled.div`
    display: flex;
    align-content: center;
`

const Message = ({reference,timestamp,senderName,message}) => {
    const isSystemMessage = senderName === 'System'
    return (
        <StyledMessage isSystemMessage ref = {reference}>
            <p>{`${timestamp} ${isSystemMessage ? '' : senderName + ':'} ${message}`}</p>
        </StyledMessage>
    )
}

export default Message