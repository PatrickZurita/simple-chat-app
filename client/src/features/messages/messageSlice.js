import {  createSlice, combineReducers} from "@reduxjs/toolkit";

const initialState = {
    returned: []
}
const messageSlice = createSlice({
    name:'messages',
    initialState:[],
    reducers: {
        addMessage: (state, action) => {
            state.push(action.payload)
        },
        resetMessages: state => Object.assign(state,initialState),
        deleteMessage: (state,action) => {

        }
    }
})
export const {addMessage, resetMessages} = messageSlice.actions
export default messageSlice.reducer;