import {  createSlice} from "@reduxjs/toolkit";

const privateMessageSlice = createSlice({
    name:'messages',
    initialState:{},
    reducers: {
        addPrivateMessage: (state, action) => {
            console.log(action.payload)
            if (state[action.payload.recipient] === undefined)
                state[action.payload.recipient] = [action.payload.message]
            else
                state[action.payload.recipient].push(action.payload.message)
        },
    }
})
export const {addPrivateMessage} = privateMessageSlice.actions
export default privateMessageSlice.reducer;