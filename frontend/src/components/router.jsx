import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';

const Router = () => (
  <Switch>
    <Route exact path='/'     component={HomePage}/>
    <Route path='/profile'    component={ProfilePage}/>
  </Switch>
);

export default Router;