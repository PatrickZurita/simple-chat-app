import React from "react";
import {StyledMessage} from "./StyledMessage";
const PrivateMessage = ({self,timestamp,senderName,message,reference}) => {
    if (self) {
        return (
            <StyledMessage isSystemMessage ref = {reference} self>
                <p>{`${message} ${timestamp}`}</p>
            </StyledMessage>
        )
    }
    return (
        <StyledMessage isSystemMessage ref = {reference}>
            <p>{`${message} ${timestamp}`}</p>
        </StyledMessage>
    )
}

export default PrivateMessage