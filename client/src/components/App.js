import React, {useEffect, useState} from 'react';
import { SocketProvider} from "../SocketProvider";
import Dashboard from "./Dashboard";
import Haikunator from "haikunator";
function App() {
    const [name,setName] = useState('')
    const haikunator = new Haikunator()
    useEffect(() => {
        setName(haikunator.haikunate())
    },[])
  return (
      <SocketProvider>
          <Dashboard name = {name}/>
      </SocketProvider>

  );
}

export default App;
