import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Note from "../routes/Note";
import styled from "styled-components";

const AppRouter = ({ isLoggedIn, userObj }) => {
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <NoteDiv>
            <Route exact path="/">
              <Note userObj={userObj} />
            </Route>
          </NoteDiv>
        ) : (
          <div>
            <Route exact path="/">
              <Auth />
            </Route>
          </div>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;

const NoteDiv = styled.div`
  width: 100%;
  height: 100vh;
`;
