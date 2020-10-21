import React from "react";
import {Tab, Tabs} from "react95";

const TabBar = ({selectedTab,handleTabClick}) => {
    return (
        <Tabs value={selectedTab} onChange={handleTabClick}>
            <Tab value={0}>Channels</Tab>
            <Tab value={1}>DM</Tab>
            <Tab value={2}>Edit Name</Tab>
        </Tabs>
    )
}

export default TabBar