import React from "react";
import { Switch, Route } from "react-router-dom";

import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import SignInPage from '../pages/SignInPage';
import BookPage from "../pages/BookPage";
import AuthorPage from "../pages/AuthorPage";
import SignUpPage from "../pages/SignUpPage";


const Router = () => (
  <Switch>
    <Route exact path='/'       component={HomePage}/>
    <Route path='/profile'      component={ProfilePage}/>
    <Route path='/sign-in'      component={SignInPage}/>
    <Route path='/register'     component={SignUpPage}/>
    <Route path='/books/:id'    component={BookPage}/>
    <Route path='/authors/:id'  component={AuthorPage}/>
  </Switch>
);

export default Router;