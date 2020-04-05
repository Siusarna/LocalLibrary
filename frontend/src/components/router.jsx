import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';


const Router = () => (
  <Switch>
    <Route exact path='/'     component={HomePage}/>
    <Route path='/profile'    component={ProfilePage}/>
    <Route path='/login'      component={LoginPage}/>
    <Route path='/register'   component={RegisterPage}/>
  </Switch>
);

export default Router;