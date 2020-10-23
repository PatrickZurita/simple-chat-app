import { configureStore} from "@reduxjs/toolkit"
import privateMessageReducer from "./features/messages/privateMessageSlice"

export default configureStore({
    reducer: {
        privateMessages: privateMessageReducer
    }
})