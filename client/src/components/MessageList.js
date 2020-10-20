import React, {useState} from "react";
import Message from "./Message";

const MessageList = ({messages}) => {
    return (
        <div>
            {messages.map((message, i) => {
                return (
                    <Message
                        key = {i}
                        {...message}
                    />
                )
            })}
        </div>
    )
}

export default MessageList