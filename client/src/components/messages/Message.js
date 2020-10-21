import React from "react";
import styled from "styled-components";

const StyledMessage = styled.div`
    display: flex;
    align-content: center;
`

const Message = ({timestamp,senderName,text}) => {
    const isSystemMessage = senderName === 'System'
    return (
        <StyledMessage isSystemMessage>
            <p>{`${timestamp} ${isSystemMessage ? '' : senderName + ':'} ${text}`}</p>
        </StyledMessage>
    )
}

export default Message