import ErrorMessage from "./components/ErrorMessage";

import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import Notification from "./components/Notification";
import {useFlash} from "./hooks/index"
import {Alert, Container} from "@mui/material"

function App() {
  
  const flash = useFlash()

  return (
    <div className="App">
      <Navbar />
      {flash.msg && <Notification type={flash.type} msg={flash.msg}/>}
      <Container>
        <div id="detail">
          <Outlet></Outlet>
        </div>
      </Container>
    </div>
  );
}

export default App;
