import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthForm from './index';
import SignUpForm from './SignUp';
import { LogIn } from '../../store/session';
import { SetCurrentModal } from '../../store/modal';
import { HideModal } from '../../store/UX';

export default function LogInForm () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [identification, setIdentification] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);

  if (user) return null;

  const onLogin = e => {
    e.preventDefault();
    dispatch(LogIn({
      identification,
      password
    }))
      .then(() => dispatch(HideModal()))
      .catch(err => setError(err));
  };

  const switchForm = () => dispatch(SetCurrentModal(SignUpForm));

  return (
    <AuthForm
      onSubmit={onLogin}
      error={error}
    >
      <input
        className='form-input login username'
        placeholder='Username or Email'
        type='text'
        required
        value={identification}
        onChange={({ target: { value } }) => setIdentification(value)}
      />
      <input
        className='form-input login password'
        placeholder='Password'
        type='password'
        required
        value={password}
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <div className='form-button-container'>
        <button
          type='submit'
          className='form-button login'
        >
          Log In
        </button>
        <button
          type='button'
          className='form-button login'
          onClick={switchForm}
        >
          I Need an Account
        </button>
      </div>
    </AuthForm>
  );
}
