import React, {useRef} from "react";
import {TextField, Button} from "react95";
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 4vh;
    width: 80%;
`
const MessageInput = ({onMessageSent}) => {
    const input = useRef(null);
    const handleSubmit = () => {
        onMessageSent(input.current.value)
        input.current.value = ''
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter')
            handleSubmit();
    }
    return (
        <Wrapper>
            <TextField
                ref = {input}
                type={"text"}
                onKeyDown = {e => handleKeyDown(e)}
                fullWidth
            />
            <Button
                onClick = {handleSubmit}
            >Send!</Button>
        </Wrapper>
    )
}

export default MessageInput