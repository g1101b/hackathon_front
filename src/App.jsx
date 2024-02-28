import React from "react";
import useWebSocket from "react-use-websocket";
import "./App.css";
import { SerialPort } from "serialport";

const D_LINK = "ws://localhost:1488";

function App() {
  const [btnState, toggleState] = React.useState(true);
  const [btnDirection, toggleDirection] = React.useState(true);
  const [btnSides, toggleSides] = React.useState(true);

  const [port, setPort] = React.useState(0);

  const initializePort = async () => {
    const serport = new SerialPort("/dev/ttyACM0", { baudRate: 1 });
    setPort(serport);
  };

  const { sendJsonMessage } = useWebSocket(D_LINK, {
    onOpen: () => void console.log("It's working"),
    onClose: () => console.log("It's just closed"),
    shouldReconnect: () => true,
  });

  React.useEffect(() => {
    document.title = "Car Contorl App";
    initializePort();
  });

  const handleStart = () => {
    toggleState(false);
    port.sendJsonMessage("stop");
  };

  const handleStop = () => {
    toggleState(true);
    sendJsonMessage("start");
  };

  const handleForvard = () => {
    toggleDirection(false);
    sendJsonMessage("forvard");
  };

  const handleBack = () => {
    toggleDirection(true);
    sendJsonMessage("back");
  };

  const handleLeft = () => {
    toggleSides(false);
    sendJsonMessage("left");
  };

  const handleRight = () => {
    toggleSides(true);
    sendJsonMessage("true");
  };

  return (
    <div className="App">
      <p>Control Panel</p>
      <div className="buttons state">
        {btnState ? (
          <button onClick={handleStart}>Start</button>
        ) : (
          <button onClick={handleStop}>Stop</button>
        )}
      </div>
      <div className="buttons direction">
        {btnDirection ? (
          <button onClick={handleForvard}>Forvard</button>
        ) : (
          <button onClick={handleBack}>Back</button>
        )}
      </div>
      <div className="buttons sides">
        {btnSides ? (
          <button onClick={handleLeft}>Left</button>
        ) : (
          <button onClick={handleRight}>Right</button>
        )}
      </div>
    </div>
  );
}

export default App;
