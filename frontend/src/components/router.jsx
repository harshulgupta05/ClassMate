import * as React from "react";
import { Switch, Route, Router } from "wouter";
import SignUp from "../pages/signup";
import Home from "../pages/home";
import Login from "../pages/login";

export default () => {
    <Switch>
        <Route path="/" component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="login" component={Login} />
    </Switch>
}