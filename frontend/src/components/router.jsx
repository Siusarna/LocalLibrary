import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from '../components/privateRoute';

import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import SignInPage from '../pages/SignInPage';
import BookPage from '../pages/BookPage';
import AuthorPage from '../pages/AuthorPage';
import SignUpPage from '../pages/SignUpPage';
import ForgotPasswordPage from '../pages/ForgotPasswordPage';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import ChangeProfilePage from '../pages/ChangeProfilePage';
import ChangePhotoPage from '../pages/ChangePhotoPage';
import AllAuthorsPage from '../pages/AllAuthorsPage';
import AllBooksPage from '../pages/AllBooksPage';
import AddBookPage from '../pages/AddBookPage';
import AddAuthorPage from '../pages/AddAuthorPage';
import UpdateBookPage from '../pages/UpdateBookPage';
import UpdateAuthorPage from '../pages/UpdateAuthorPage';
import WorkPage from '../pages/WorkPage';
import Empty from './empty';
import RejectOrderPage from '../pages/RejectOrderPage';
import ConfirmationCodePage from '../pages/ConfirmationCodePage';


const Router = () => (
  <Switch>
    <Route exact path='/'           component={HomePage}/>
    <Route path='/sign-in'          component={SignInPage}/>
    <Route path='/register'         component={SignUpPage}/>
    <Route path='/forgot-password'  component={ForgotPasswordPage}/>
    <Route path='/books/all'        component={AllBooksPage}/>
    <Route path='/authors/all'      component={AllAuthorsPage}/>
    <PrivateRoute path='/profile'   component={ProfilePage}/>
    <PrivateRoute path='/change-password'   component={ChangePasswordPage}/>
    <PrivateRoute path='/change-profile'    component={ChangeProfilePage}/>
    <PrivateRoute path='/change-photo'      component={ChangePhotoPage}/>
    <PrivateRoute path='/change-photo'      component={ChangePhotoPage}/>
    <PrivateRoute path='/books/add'             role='librarian'  component={AddBookPage}/>
    <PrivateRoute path='/authors/add'           role='librarian'  component={AddAuthorPage}/>
    <PrivateRoute path='/books/:id/update'      role='librarian'  component={UpdateBookPage}/>
    <PrivateRoute path='/authors/:id/update'    role='librarian'  component={UpdateAuthorPage}/>
    <PrivateRoute path='/work'                  role='librarian'  component={WorkPage}/>
    <PrivateRoute path='/orders/reject/:id'     role='librarian'  component={RejectOrderPage}/>
    <PrivateRoute path='/orders/ccode/:id'      role='librarian'  component={ConfirmationCodePage}/>
    <Route path='/books/:id'        component={BookPage}/>
    <Route path='/authors/:id'      component={AuthorPage}/>
    <Route path='/empty'      component={Empty}/>
  </Switch>
);

export default Router;