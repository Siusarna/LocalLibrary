import React from 'react';
import Router from './components/router';
import './styles/common.scss'
import { BrowserRouter } from "react-router-dom";

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
)

export default App;
