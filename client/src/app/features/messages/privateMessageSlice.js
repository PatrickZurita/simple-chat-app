import {  createSlice} from "@reduxjs/toolkit";
import getTimeStamp from "../../../helper/getTimeStamp";
const buildMessage = (message) => {
    return {
        message:message,
        timestamp: getTimeStamp()
    }
}
const privateMessageSlice = createSlice({
    name:'messages',
    initialState:{
    },
    reducers: {
        addPrivateMessage: (state, action) => {
            if (action.payload.self === undefined) {
                if (state[action.payload.sender] === undefined)
                    state[action.payload.sender] = [buildMessage(action.payload.message)]
                else
                    state[action.payload.sender].push(buildMessage(action.payload.message))
            }
            else {
                let message = buildMessage(action.payload.message)
                message.self = true
                if (state[action.payload.recipient] === undefined)
                    state[action.payload.recipient] = [message]
                else
                    state[action.payload.recipient].push(message)
            }
        },
    }
})
export const filterMessagesBySender = (state,sender) => state.privateMessages[sender]
export const {addPrivateMessage} = privateMessageSlice.actions
export default privateMessageSlice.reducer;