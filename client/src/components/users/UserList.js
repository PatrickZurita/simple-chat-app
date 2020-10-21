import React from "react";
import styled from "styled-components"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 8vw;
    height: 50vh;
    align-items: center;  
    overflow-y:auto;
    div:first-of-type {
      position: sticky;
      top: 0;
      background-color: #c6c6c6;
      width: 50%;
      text-align: center;
    }
    div:last-of-type {
        padding-top: 1vh;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`
const UserList = ({users}) => {
    return (
        <Wrapper>
            <div>{users.length + 1} online</div>
            <div>
                {users.map((user,i) => {
                    return <p key = {i}>{user}</p>
                })}
            </div>

        </Wrapper>
    )
}

export default UserList