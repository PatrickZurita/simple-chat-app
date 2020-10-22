import React, {useRef} from "react";
import {useSelector} from "react-redux";

const PrivateTab = ({sendPrivate}) => {
    const messages = useSelector(state => state.privateMessages)
    const input = useRef(null);
    const input2 = useRef(null);
    console.log(messages)
    const handleSubmit = () => {
        sendPrivate(input.current.value,input2.current.value);
    }
    return (
        <div>
            <input ref = {input}/>
            <input ref = {input2}/>
            <button onClick = {handleSubmit} type={"submit"}>GO</button>
        </div>
    )
}
export default PrivateTab