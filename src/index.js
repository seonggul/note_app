import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import styled from "styled-components";

const Contain = styled.div`
  width: 100%;
  height: 100vh;
`;

ReactDOM.render(
  <React.StrictMode>
    <Fragment>
    <Contain>
      <App />
    </Contain>
    </Fragment>
  </React.StrictMode>,
  document.getElementById("root")
);
