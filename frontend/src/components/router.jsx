import React from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from '../components/privateRoute';

import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import SignInPage from '../pages/SignInPage';
import BookPage from "../pages/BookPage";
import AuthorPage from "../pages/AuthorPage";
import SignUpPage from "../pages/SignUpPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import ChangeProfilePage from "../pages/ChangeProfilePage";
import ChangePhotoPage from "../pages/ChangePhotoPage";


const Router = () => (
  <Switch>
    <Route exact path='/'           component={HomePage}/>
    <Route path='/sign-in'          component={SignInPage}/>
    <Route path='/register'         component={SignUpPage}/>
    <Route path='/forgot-password'  component={ForgotPasswordPage}/>
    <Route path='/books/:id'        component={BookPage}/>
    <Route path='/authors/:id'      component={AuthorPage}/>
    <PrivateRoute path='/profile'   component={ProfilePage}/>
    <PrivateRoute path='/change-password'   component={ChangePasswordPage}/>
    <PrivateRoute path='/change-profile'    component={ChangeProfilePage}/>
    <PrivateRoute path='/change-photo'      component={ChangePhotoPage}/>
  </Switch>
);

export default Router;