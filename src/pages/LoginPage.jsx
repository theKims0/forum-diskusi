import React from 'react';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <div className="login-page">
      <h1 className="poppins-bold">Login</h1>
      <h2>
        Lets Discuss with everyone aku ini addd
      </h2>

      <LoginInput login={onLogin} />
    </div>
  );
}

export default LoginPage;
