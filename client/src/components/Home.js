import React from "react";
import styled from "styled-components"
import {Button, ListItem, Window, WindowHeader, Divider, Cutout} from "react95";
import capitalize from "../helper/capitalize";
const Container = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: teal;
      min-height: 100vh;
      .container {
          display: flex;
          flex-wrap: wrap;
          padding: 5vw;
      }
      .container .li:hover {
          cursor: pointer;
      }
`
const Home = () => {
    const handleClick = (route) => {
        window.location.href = route
    }
    const channels = ["movies","games","food","music","tech","develop","github","cooking","trends","sports"]
    return (
        <Container>
            <h1>Welcome to my chat app!</h1>
            <Window>
                <WindowHeader style = {{display:"flex",justifyContent:"space-between"}}>chat.exe <Button>&times;</Button></WindowHeader>
                <h1>First select a Channel:</h1>
                <Cutout className={"container"}>
                    {
                        channels.map((channel,i) => {
                            return (
                                <>
                                    <ListItem key = {i} onClick={e =>handleClick(channel)}>
                                        <p>{capitalize(channel)}</p>
                                    </ListItem>
                                    { i === channels.length - 1 ? null : (<Divider size='120px' />)}

                                </>


                            )
                        })
                    }
                </Cutout>

            </Window>
        </Container>
    )
}

export default Home