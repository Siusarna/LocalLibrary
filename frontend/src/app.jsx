import React from 'react';
import Router from './components/router';
import './styles/normalize.scss';
import './styles/common.scss';
import { BrowserRouter } from "react-router-dom";
import AuthProvider from './components/authProvider';
import Header from './components/header';

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)

export default App;
