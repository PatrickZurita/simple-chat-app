import React from "react";
import styled from "styled-components";

const StyledMessage = styled.div`
    display: flex;
    align-content: center;
`

const PrivateMessage = ({self,timestamp,senderName,message,reference}) => {
    if (self) {
        return (
            <StyledMessage isSystemMessage ref = {reference}>
                <p>{`${timestamp} You: ${message}`}</p>
            </StyledMessage>
        )
    }
    return (
        <StyledMessage isSystemMessage ref = {reference}>
            <p>{`${timestamp} ${senderName}: ${message}`}</p>
        </StyledMessage>
    )
}

export default PrivateMessage