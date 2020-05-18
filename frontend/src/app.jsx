import React from 'react';
import Router from './components/service/router';
import './styles/normalize.scss';
import './styles/common.scss';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './components/service/authProvider';
import Header from './components/layout/header';

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
