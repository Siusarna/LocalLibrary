import React from 'react';
import Router from './components/router';
import './styles/common.scss'
import { BrowserRouter } from "react-router-dom";
import AuthProvider from './components/authProvider';

const App = () => (
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)

export default App;
