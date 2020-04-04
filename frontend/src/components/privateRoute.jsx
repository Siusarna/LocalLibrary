import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../context/authContext';

const PrivateRoute = ({component: Component, role, ...rest}) => {
  const { role: currentRole } = useContext(AuthContext);
  console.dir(currentRole);
  const isAccessible = role ?
    (currentRole === role) :
    (currentRole !== 'undefined');
  console.dir({ currentRole, role, isAccessible });
  return (
    <Route {...rest} 
      render={props => (
        isAccessible ?
          <Component {...props} /> :
          <Redirect to='/' />  
      )}
    />
  );
};

export default PrivateRoute;