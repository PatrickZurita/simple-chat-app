import { configureStore} from "@reduxjs/toolkit"
import messageReducer  from "../features/messages/messageSlice"
import privateMessageReducer from "../features/messages/privateMessageSlice"

export default configureStore({
    reducer: {
        messages: messageReducer,
        privateMessages: privateMessageReducer,
        currentUsers:''
    }
})