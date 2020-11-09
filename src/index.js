import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import styled from "styled-components";

const Contain = styled.div`
  height: 100%;
`;

ReactDOM.render(
  <React.StrictMode>
    <Contain>
      <App />
    </Contain>
  </React.StrictMode>,
  document.getElementById("root")
);
