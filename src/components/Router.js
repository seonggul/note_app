import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Note from "../routes/Note";
import styled from "styled-components";

const AppRouter = ({ isLoggedIn, userObj }) => {
  console.log(userObj);
  return (
    <Router>
      <Switch>
        {isLoggedIn ? (
          <div>
            <Route exact path="/">
              <Note userObj={userObj} />
            </Route>
          </div>
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
