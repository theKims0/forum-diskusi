import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className="login-content">

      <form>
        <input type="text" className="form-input" value={name} onChange={onNameChange} placeholder="Name" />
        <input type="text" className="form-input" value={email} onChange={onEmailChange} placeholder="Username" />
        <input type="password" className="form-input" value={password} onChange={onPasswordChange} placeholder="Password" />
        <button type="button" className="button-primary" onClick={() => register({ name, email, password })}>Register</button>
      </form>
      <p>
        Already have an account?
        {' '}
        <Link to="/">Login</Link>
      </p>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
