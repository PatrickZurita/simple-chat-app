import {  createSlice} from "@reduxjs/toolkit";

const privateMessageSlice = createSlice({
    name:'messages',
    initialState:{},
    reducers: {
        addPrivateMessage: (state, action) => {
            if (state[action.payload.sender] === undefined)
                state[action.payload.sender] = [action.payload.message]
            else
                state[action.payload.sender].push(action.payload.message)
        },
    }
})
export const {addPrivateMessage} = privateMessageSlice.actions
export default privateMessageSlice.reducer;