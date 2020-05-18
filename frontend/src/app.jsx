import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/service/router.jsx';
import './styles/normalize.scss';
import './styles/common.scss';
import AuthProvider from './components/service/authProvider.jsx';
import Header from './components/layout/header.jsx';

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

export default App;
