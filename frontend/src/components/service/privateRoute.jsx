import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/authContext.jsx';

const PrivateRoute = ({ component: Component, role, ...rest }) => {
  const { role: currentRole } = useContext(AuthContext);
  const isAccessible = role
    ? (currentRole === role)
    : (currentRole !== 'unauthorized');
  return (
    <Route {...rest}
      render={(props) => (
        isAccessible
          ? <Component {...props} />
          : <Redirect to='/' />
      )}
    />
  );
};

export default PrivateRoute;
