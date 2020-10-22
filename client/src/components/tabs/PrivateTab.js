import React, { useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components"
import {Button,Fieldset} from "react95";
import ComposeMessage from "../messages/ComposeMessage";
import PrivateMessageList from "../messages/PrivateMessageList";

const Wrapper = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: start;
    .left-zone {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 50vh;
    }
    .messengers {
        width: 8vw;
        margin: 0 1vw;
    }
`
const PrivateTab = ({sendPrivate}) => {
    const allMessages = useSelector(state => state.privateMessages)
    const [open,setOpen] = useState(false)
    const getAllSenders = Object.keys(allMessages)
    const [selected,setSelected] = useState(null)
    const handleClick = (sender) => {
        setSelected(sender)
    }
    const handleModalClick = () => {
        setOpen(!open)
    }
    if (getAllSenders.length === 0) {
        return (
            <div>
                <h1>No Private Message</h1>
                <p>Still you can <Button onClick={e => handleModalClick()}>Compose</Button> a Message </p>
                <ComposeMessage
                    isOpen={open}
                    handleModalClick={handleModalClick}
                    sendPrivate = {sendPrivate}
                />
            </div>
        )
    }
    return (
        <Wrapper>
            <div className={"left-zone"}>
                <Fieldset label={"Conversations"} className = {"messengers"}>
                    {Object.keys(allMessages).map((sender, i) => {
                        return (
                            <div key = {i} onClick={e => handleClick(sender)}>
                                <p>{sender}</p>
                            </div>
                        )
                    })}
                </Fieldset>
                <Button onClick={e => handleModalClick()}>Compose</Button>
            </div>
            <PrivateMessageList
                allMessages = {allMessages}
                selected={selected}
                sendPrivate={sendPrivate}
            />
            <ComposeMessage
                isOpen={open}
                handleModalClick={handleModalClick}
                sendPrivate = {sendPrivate}
            />
        </Wrapper>
    )
}
export default PrivateTab