import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className="login-content">
      <form>
        <input type="text" className="form-input" value={email} onChange={onEmailChange} placeholder="Email" />
        <input type="password" className="form-input" value={password} onChange={onPasswordChange} placeholder="Password" />
        <button type="button" className="button-primary" onClick={() => login({ email, password })}>Login</button>
      </form>
      <p>
        Do&apos;nt have an account?
        <Link to="/register">Register here.</Link>
      </p>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
