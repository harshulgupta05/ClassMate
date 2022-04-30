import * as React from "react";
import { Switch, Route, Router } from "wouter";
import SignUp from "../pages/signup";

export default () => {
    <Switch>
        <Route path="/signup" component={SignUp} />
    </Switch>
}