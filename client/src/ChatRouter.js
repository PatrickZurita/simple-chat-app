import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Dashboard from "./components/Dashboard";
import {SocketProvider} from "./contexts/SocketProvider";
import Haikunator from "haikunator";
import styled from "styled-components"
const Wrapper = styled.section`
    display: flex;
    background-color: teal;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
`
const ChatRouter = () => {
    const [name,setName] = useState('')
    const haikunator = new Haikunator()
    useEffect(() => {
        setName(haikunator.haikunate())
    },[])
    return (
            <Router>
                <Switch>
                    <Route path={'/'} exact render = {() => <h1>Home</h1>}/>
                    <Route path={'/'}>
                        <Wrapper>

                            <SocketProvider>
                                <Dashboard name = {name}/>
                            </SocketProvider>
                        </Wrapper>
                    </Route>
                </Switch>

            </Router>
    )
}
export default ChatRouter