import React from "react";
import {Link} from "react-router-dom";
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
`
const ChannelList = ({clickedButton}) => {
    const channels = ["movies","games","food"]
    return (
        <Wrapper>
            <Fieldset label={"Channels"}>
                {
                    channels.map((channel, i) => {
                        return (
                            <div className={"top-button"} key={i}>
                                <ListItem key = {i} onClick={clickedButton}>
                                    <Link to = {channel}>
                                        {capitalize(channel)}
                                    </Link>
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