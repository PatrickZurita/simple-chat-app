import React from "react";
import styled from "styled-components"
import Message from "./Message";

const Wrapper = styled.div`
    display: flex;
     flex-direction: column;
     overflow-y: auto;
    .window-header {
        display: flex;
        align-items: center;
          justify-content: space-between;
    }
    .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: '';
      position: absolute;
      background: ___CSS_0___;
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`
const MessageList = ({messages, currentChannel, currentName}) => {
    return (
        <Wrapper>
                <div className={"message-list"}>
                    {messages.map((message, i) => {
                        return (
                            <Message
                                key = {i}
                                {...message}
                            />
                        )
                    })}
                </div>

        </Wrapper>
    )
}

export default MessageList