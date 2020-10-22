import React from "react";
import {useHistory,useLocation} from "react-router-dom";
import styled from "styled-components"
import { Divider, ListItem, Fieldset} from "react95";
import capitalize from "../../helper/capitalize";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 10vw;
    margin-right: 2vw;
    a:active,a:link,a:visited {
        color: black; 
        text-decoration: none;
    }
    .container {
        overflow-y: auto;
        overflow-x: hidden;
        height: 50vh;
    }
    .container::-webkit-scrollbar {
        width: 10px;
    }
    .container::-webkit-scrollbar-track {
        box-shadow: inset 0 0 5px grey; 
    }
    .channel-button {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
    .container::-webkit-scrollbar-thumb {
        background: #060084; 
    }
    .container::-webkit-scrollbar-thumb:hover {
        background: yellowgreen; 
  }
    .channel-button li {
        width: 100%;
        padding: 0;
        margin: 0 20px 0 20px;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    .channel-button:hover {
        cursor: pointer;
    }
`
const ChannelList = ({clickedButton}) => {
    const channels = ["movies","games","food","music","tech","develop","github","cooking","trends"]
    const history = useHistory();
    const location = useLocation();
    const handleClick = (route) => {
        history.push(`/${route}`)
    }
    return (
        <Wrapper>
            <Fieldset label={"Channels"} >
                <div className={"container"}>
                    {
                        channels.map((channel, i) => {
                            return (
                                <div className={"channel-button"} key={i} onClick={e =>handleClick(channel)}>
                                    <ListItem key = {i} onClick={clickedButton} disabled = {channel === location.pathname.substr(1)}>
                                        #  {capitalize(channel)}
                                    </ListItem>
                                    { i === channels.length - 1 ? null : (<Divider/>)}
                                </div>
                            )
                        })
                    }
                </div>
            </Fieldset>
        </Wrapper>
    )
}

export default ChannelList