import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Dashboard from "./components/Dashboard";
import {SocketProvider} from "./contexts/SocketProvider";
import Haikunator from "haikunator";
import styled from "styled-components"
import Home from "./components/Home";
const Wrapper = styled.section`
    display: flex;
    background-color: teal;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
`
const ChatRouter = () => {
    const haikunator = new Haikunator()
    const [name,setName] = useState(haikunator.haikunate())
    const handleNameChange = (newName) => {
        setName(newName)
    }
    return (
            <Router>
                <Switch>
                    <Route path={'/'} exact render = {Home}/>
                    <Route path={'/'}>
                        <Wrapper>
                            <SocketProvider>
                                <Dashboard name = {name} onNameChange = {handleNameChange}/>
                            </SocketProvider>
                        </Wrapper>
                    </Route>
                </Switch>

            </Router>
    )
}
export default ChatRouter