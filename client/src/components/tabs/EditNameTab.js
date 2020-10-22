import React, {useRef} from "react";
import {Button, TextField} from "react95";
import styled from "styled-components"

const Wrapper = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 30vh;
`
const EditNameTab = ({currentName,onNameChange}) => {
    const input = useRef(null)
    const handleClick = () => {
        if (input.current.value !== '') {
            onNameChange(input.current.value)
            input.current.value = ''
        }
    }
    return(
        <Wrapper>
            <div>
                <h1>Change your name :</h1>
                <h2>Current: {currentName}</h2>
            </div>
            <div style={{display:"flex",justifyContent:"center"}}>
                <TextField
                    ref = {input}
                />
                <Button
                    onClick={e => handleClick()}
                >
                    Change my name!
                </Button>
            </div>
        </Wrapper>
    )
}

export default EditNameTab