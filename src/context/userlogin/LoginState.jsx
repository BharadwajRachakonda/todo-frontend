import React, { useState } from "react";
import loginContext from "./loginContext";

function LoginState(props) {
  const [authToken, setAuthToken] = useState("");
  // Add console log to track authToken updates
  return (
    <loginContext.Provider value={{ authToken, setAuthToken }}>
      {props.children}
    </loginContext.Provider>
  );
}

export default LoginState;
