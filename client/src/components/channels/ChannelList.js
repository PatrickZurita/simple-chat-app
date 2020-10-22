import React from "react";
import {useHistory} from "react-router-dom";
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
    .channel-button {
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 100%;
    }
    .channel-button li {
        width: 100%;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    .channel-button:hover {
        cursor: pointer;
    }
`
const ChannelList = ({clickedButton}) => {
    const channels = ["movies","games","food"]
    const history = useHistory();
    const handleClick = (route) => {
        history.push(`/${route}`)
    }
    return (
        <Wrapper>
            <Fieldset label={"Channels"}>
                {
                    channels.map((channel, i) => {
                        return (
                            <div className={"channel-button"} key={i} onClick={e =>handleClick(channel)}>
                                <ListItem key = {i} onClick={clickedButton}>
                                    {capitalize(channel)}
                                </ListItem>
                                { i === channels.length - 1 ? null : (<Divider/>)}
                            </div>
                        )
                    })
                }
            </Fieldset>
        </Wrapper>
    )
}

export default ChannelList