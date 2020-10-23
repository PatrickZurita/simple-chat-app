import React from "react";
import {StyledMessage} from "./StyledMessage";
const PrivateMessage = ({self,timestamp,senderName,message,reference}) => {
    if (self) {
        return (
            <StyledMessage isSystemMessage ref = {reference} self visible>
                <p>{`${message} ${timestamp}`}</p>
            </StyledMessage>
        )
    }
    return (
        <StyledMessage isSystemMessage ref = {reference} visible>
            <p>{`${message} ${timestamp}`}</p>
        </StyledMessage>
    )
}

export default PrivateMessage