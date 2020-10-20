import React from "react";
import styled from "styled-components";

const Message = ({timestamp,senderName,text}) => {
    return (
        <div>
            <p>{timestamp}</p>
            {(senderName === 'System' ? null : (<p>{senderName}</p>))}
            <p>{text}</p>
        </div>
    )
}

export default Message