import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/');
  };

  return (
    <div className="login-page">
      <h1 className="poppins-bold">Lets Register</h1>
      <h2>Create your account</h2>
      <RegisterInput register={onRegister} />
    </div>
  );
}
export default RegisterPage;
