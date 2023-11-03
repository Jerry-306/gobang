import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Pagrs/Home";
import Welcome from "./Pagrs/Welcome";

export default function App() {
  return (
    <>
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/home" component={Home} />
        <Redirect to="/welcome" />
      </Switch>
    </>
  );
}
