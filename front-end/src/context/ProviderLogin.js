import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ContextLogin from './ContextLogin';

function ProviderLogin({ children }) {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState('');
  const [allowed, setAllowed] = useState(true);
  const urlBase = 'http://localhost:3000';

  const makeLogin = async (email, password) => {
    setAllowed(true);
    const { data: { token: newToken, user: newUser, error } } = await axios
      .post(`${urlBase}/users/login`, { email, password })
      .catch((er) => console.log(er));
    if (error !== undefined) {
      console.log(error);
      return setAllowed(false);
    }
    setToken(newToken);
    setUser(newUser);
  };

  const createUser = async (name, email, password) => {
    await axios.post(`${urlBase}/users/register`, {
      name, email, password,
    });
  };

  return (
    <ContextLogin.Provider
      value={ {
        user,
        createUser,
        makeLogin,
        token,
        allowed,
      } }
    >
      { children }
    </ContextLogin.Provider>
  );
}

ProviderLogin.propTypes = {
  children: PropTypes.objectOf(PropTypes.shape(
    PropTypes.object,
  )),
}.isRequired;

export default ProviderLogin;
