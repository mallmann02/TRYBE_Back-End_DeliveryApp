import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import ContextLogin from './ContextLogin';
import {
  verifyUserExistance,
  storeUser,
} from '../utils/LocalStorageFunctions';

const axios = require('axios').default;

function ProviderLogin({ children }) {
  const [invalidEmailError, setInvalidEmailError] = useState(false);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState(false);
  const [userData, setUserData] = useState();
  const urlBase = 'http://localhost:3001';
  const history = useHistory();

  useEffect(() => {
    const user = verifyUserExistance();
    if (!user) history.push('/login');
    setUserData(user);
  }, []);

  const makeLogin = async (email, password) => {
    setInvalidEmailError(false);
    try {
      const { data } = await axios.post(`${urlBase}/login`, { email, password });
      storeUser(data);
      setUserData(data);
      return true;
    } catch (error) {
      setInvalidEmailError(true);
      return false;
    }
  };

  // ---------------------------------------------/---------------------------------------------------------------//

  const createUser = async (name, email, password) => {
    setSignUpErrorMessage(false);
    try {
      await axios.post(`${urlBase}/register`, { name, email, password });
      return true;
    } catch (error) {
      setSignUpErrorMessage(true);
      return false;
    }
  };

  // ---------------------------------------------/---------------------------------------------------------------//

  return (
    <ContextLogin.Provider
      value={ {
        createUser,
        makeLogin,
        signUpErrorMessage,
        invalidEmailError,
        userData,
      } }
    >
      {children}
    </ContextLogin.Provider>
  );
}

ProviderLogin.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderLogin;
