import React, { useState, useEffect } from 'react';

import AuthContext from '../../context/authContext.jsx';

const AuthProvider = (props) => {
  const [role, setRole] = useState('unauthorized');
  const [isValid, setValid] = useState('false');

  useEffect(() => {
    if (isValid) return;

    fetch('https://fathomless-ravine-92681.herokuapp.com/api/accounts/profile',
      { credentials: 'include' })
      .then((res) => {
        setValid(res.ok);
        if (res.status === 401) {
          setRole('unauthorized');
        }
        return res.json();
      })
      .then((data) => {
        if (['customer', 'librarian'].includes(data.role)) {
          setRole(data.role);
        }
      });
  }, [isValid]);

  const updateAuth = () => { setValid(false); };

  return (
    <AuthContext.Provider value={{ role, updateAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
