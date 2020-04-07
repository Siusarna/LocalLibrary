import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import SignInPage from '../pages/SignInPage';
import RegisterPage from '../pages/RegisterPage';
import BookPage from "../pages/BookPage";
import AuthorPage from "../pages/AuthorPage";


const Router = () => (
  <Switch>
    <Route exact path='/'       component={HomePage}/>
    <Route path='/profile'      component={ProfilePage}/>
    <Route path='/sign-in'      component={SignInPage}/>
    <Route path='/register'     component={RegisterPage}/>
    <Route path='/books/:id'    component={BookPage}/>
    <Route path='/authors/:id'  component={AuthorPage}/>
  </Switch>
);

export default Router;