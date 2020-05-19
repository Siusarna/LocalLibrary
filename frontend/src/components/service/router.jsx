import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './privateRoute.jsx';

import HomePage from '../../pages/HomePage.jsx';
import ProfilePage from '../../pages/ProfilePage.jsx';
import SignInPage from '../../pages/SignInPage.jsx';
import BookPage from '../../pages/BookPage.jsx';
import AuthorPage from '../../pages/AuthorPage.jsx';
import SignUpPage from '../../pages/SignUpPage.jsx';
import ForgotPasswordPage from '../../pages/ForgotPasswordPage.jsx';
import ChangePasswordPage from '../../pages/ChangePasswordPage.jsx';
import ChangeProfilePage from '../../pages/ChangeProfilePage.jsx';
import ChangePhotoPage from '../../pages/ChangePhotoPage.jsx';
import AllAuthorsPage from '../../pages/AllAuthorsPage.jsx';
import AllBooksPage from '../../pages/AllBooksPage.jsx';
import AddBookPage from '../../pages/AddBookPage.jsx';
import AddAuthorPage from '../../pages/AddAuthorPage.jsx';
import UpdateBookPage from '../../pages/UpdateBookPage.jsx';
import UpdateAuthorPage from '../../pages/UpdateAuthorPage.jsx';
import WorkPage from '../../pages/WorkPage.jsx';
import Empty from './empty.jsx';
import RejectOrderPage from '../../pages/RejectOrderPage.jsx';
import ConfirmationCodePage from '../../pages/ConfirmationCodePage.jsx';
import AllNewsPage from '../../pages/AllNewsPage.jsx';
import NewsPage from '../../pages/NewsPage.jsx';
import AddNewsPage from '../../pages/AddNewsPage.jsx';
import UpdateNewsPage from '../../pages/UpdateNewsPage.jsx';
import AddReviewPage from '../../pages/AddReviewPage.jsx';
import UpdateReviewPage from '../../pages/UpdateReviewPage.jsx';


const Router = () => (
  <Switch>
    <Route exact path='/' component={HomePage}/>
    <Route path='/sign-in' component={SignInPage}/>
    <Route path='/register' component={SignUpPage}/>
    <Route path='/forgot-password' component={ForgotPasswordPage}/>
    <Route path='/books/all' component={AllBooksPage}/>
    <Route path='/authors/all' component={AllAuthorsPage}/>
    <Route path='/news/all' component={AllNewsPage}/>
    <PrivateRoute path='/profile' component={ProfilePage}/>
    <PrivateRoute path='/change-password' component={ChangePasswordPage}/>
    <PrivateRoute path='/change-profile' component={ChangeProfilePage}/>
    <PrivateRoute path='/change-photo' component={ChangePhotoPage}/>
    <PrivateRoute path='/change-photo' component={ChangePhotoPage}/>
    <PrivateRoute path='/reviews/:bookId/add' component={AddReviewPage}/>
    <PrivateRoute path='/reviews/update' component={UpdateReviewPage}/>
    <PrivateRoute path='/books/add' role='librarian' component={AddBookPage}/>
    <PrivateRoute path='/authors/add' role='librarian' component={AddAuthorPage}/>
    <PrivateRoute path='/news/add' role='librarian' component={AddNewsPage}/>
    <PrivateRoute path='/books/:id/update' role='librarian' component={UpdateBookPage}/>
    <PrivateRoute path='/authors/:id/update' role='librarian' component={UpdateAuthorPage}/>
    <PrivateRoute path='/news/:id/update' role='librarian' component={UpdateNewsPage}/>
    <PrivateRoute path='/work' role='librarian' component={WorkPage}/>
    <PrivateRoute path='/orders/reject/:id' role='librarian' component={RejectOrderPage}/>
    <PrivateRoute path='/orders/ccode/:id' role='librarian' component={ConfirmationCodePage}/>
    <Route path='/books/:id' component={BookPage}/>
    <Route path='/authors/:id' component={AuthorPage}/>
    <Route path='/news/:id' component={NewsPage}/>
    <Route path='/empty' component={Empty}/>
  </Switch>
);

export default Router;
