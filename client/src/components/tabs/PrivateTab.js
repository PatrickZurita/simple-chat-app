import React, {useRef,useState} from "react";
import {useSelector} from "react-redux";
import styled from "styled-components"
import {Button, Cutout, Fieldset, TextField, Window, WindowHeader} from "react95";

const Wrapper = styled.section`
    display: flex;
    justify-content: center;
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
    .message-zone {
        width: 80%;
    }
    .compose-modal {
        width: 350px;
        height: 500px;
        top:25%;
        position: fixed;
        z-index: 10;
        display: flex;
        flex-direction: column;
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
  }
  .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .background {
      background-color: rgba(0,0,0,0.8);
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      z-index:9
  }
`
const PrivateTab = ({sendPrivate}) => {
    const messages = useSelector(state => state.privateMessages)
    const [open,setOpen] = useState(false)
    const [selected,setSelected] = useState('')
    const getAllSenders = Object.keys(messages)
    const input = useRef(null);
    const input2 = useRef(null);
    const handleClick = (sender) => {
        setSelected(sender)
    }
    const handleModalClick = () => {
        setOpen(!open)
    }
    const handleSubmit = () => {
        sendPrivate(input.current.value,input2.current.value);
        handleModalClick()
    }
    if (getAllSenders.length === 0) {
        return (
            <div>
                <h1>No Private Message</h1>
                <p>Still you can <Button onClick={e => handleModalClick()}>Compose</Button> a Message </p>

            </div>
        )
    }
    return (
        <Wrapper>
            <div className={"left-zone"}>
                <Fieldset label={"Private Messages"} className = {"messengers"}>
                    {Object.keys(messages).map((sender, i) => {
                        return (
                            <div key = {i} onClick={e => handleClick(sender)}>
                                <p>{sender}</p>
                            </div>
                        )
                    })}
                </Fieldset>
                <Button onClick={e => handleModalClick()}>Compose Message</Button>
            </div>
            <div className={"message-zone"}>
                <Cutout
                    variant={"well"}
                    style={{width:"100%",height:"50vh",overflowY:"auto"}}
                >
                </Cutout>
            </div>
            { open ? (
                <>
                    <div className={"background"}/>
                    <Window className = {"compose-modal"}>
                        <WindowHeader className = {"header"}>
                            compose.exe
                            <Button onClick={e =>handleModalClick()}>
                                &times;
                            </Button>
                        </WindowHeader>
                        To:
                        <TextField ref = {input}/>
                        Message:
                        <TextField ref = {input2} multiline rows = {10}/>
                        <Button onClick = {handleSubmit} type={"submit"}>Send</Button>
                    </Window>
                </>
            ) : null}

        </Wrapper>
    )
}
export default PrivateTab