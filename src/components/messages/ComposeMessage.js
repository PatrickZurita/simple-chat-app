import React, {useRef} from "react";
import {Button, TextField, Window, WindowHeader} from "react95";
import styled from "styled-components"

const Wrapper = styled.div`
    .compose-modal {
        width: 350px;
        height: 350px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .compose-message {
         height: 90%;
         padding-left: 10%;
         padding-right: 10%;
         display: flex;
         flex-direction: column;
         justify-content: center;
         button {
              margin-top: 10%;
         }
    }
  .background {
      background-color: rgba(0,0,0,0.8);
      width: 100vw;
      height: 100vh;
      position: fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      left: 0;
      z-index:9
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
`
const ComposeMessage = ({isOpen,handleModalClick,sendPrivate}) => {

    const input = useRef(null);
    const input2 = useRef(null);

    const handleSubmit = () => {
        sendPrivate(input.current.value,input2.current.value);
        handleModalClick()
    }
    if (isOpen)
        return (
            <Wrapper>
                <div className={"background"}>
                    <Window className = {"compose-modal"}>
                        <WindowHeader className = {"header"}>
                            compose.exe
                            <Button onClick={e =>handleModalClick()}>
                                &times;
                            </Button>
                        </WindowHeader>
                        <div className={"compose-message"}>
                            To:
                            <TextField ref = {input}/>
                            Message:
                            <TextField ref = {input2} multiline rows = {5} className={"input-area"}/>
                            <Button onClick = {handleSubmit} type={"submit"}>Send</Button>
                        </div>
                    </Window>
                </div>
            </Wrapper>
        )
    else
        return null
}

export default ComposeMessage