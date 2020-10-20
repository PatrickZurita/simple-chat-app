import React, {useRef} from "react";
import styled from "styled-components"

const Button = styled.button`
    
`
const Input = styled.input`
    
`
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    background-color: lightblue;
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
            <Input
                ref = {input}
                type = {"text"}
                onKeyDown = {e => handleKeyDown(e)}
            />
            <Button
                onClick = {handleSubmit}
            >Send!</Button>
        </Wrapper>
    )
}

export default MessageInput