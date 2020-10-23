import React from 'react';
import ChatRouter from "../ChatRouter";
import { ThemeProvider } from 'styled-components';
import original from "react95/dist/themes/original";
function App() {
  return (
      <div>
          <ThemeProvider theme={original}>
            <ChatRouter/>
          </ThemeProvider>
      </div>
  );
}

export default App;
