import React, {useContext, useEffect, useState} from "react";

const ChannelContext = React.createContext();
export function useChannels () {
    return useContext(ChannelContext)
}
export function ChannelProvider({id,children}) {
    const [channels, setChannels] = useState([])
    return (
        <ChannelContext.Provider value = {channels}>
            {children}
        </ChannelContext.Provider>
    )
}