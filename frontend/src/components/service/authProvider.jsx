import React, { useState, useEffect } from 'react';

import AuthContext from '../../context/authContext.jsx';

import api from '../../config/api.jsx';

const AuthProvider = (props) => {
  const [user, setUser] = useState({ role: 'unauthorized' });
  const [isValid, setValid] = useState('false');
  useEffect(() => {
    if (isValid) return;

    fetch(api.accounts.profile(),
      { credentials: 'include' })
      .then((res) => {
        setValid(res.ok);
        if (res.status === 401) {
          setUser({ role: 'unauthorized' });
        }
        return res.json();
      })
      .then((data) => {
        if (['customer', 'librarian'].includes(data.role)) {
          setUser(data);
        }
      });
  }, [isValid]);

  const updateAuth = () => { setValid(false); };

  return (
    <AuthContext.Provider value={{ updateAuth, ...user }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
