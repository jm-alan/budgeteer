import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthForm from './index';
import LogInForm from './LogIn';
import Error from './Error';
import { SignUp } from '../../store/session';
import { SetCurrentModal } from '../../store/modal';
import { HideModal } from '../../store/UX';

export default function SignUpForm () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  if (user) return null;

  const onSignup = e => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(SignUp({
        username,
        email,
        password
      }))
        .then(() => dispatch(HideModal()))
        .catch(err => setError(err));
    }
  };

  const switchForm = () => dispatch(SetCurrentModal(LogInForm));

  return (
    <>
      <Error error={error} />
      <AuthForm onSubmit={onSignup}>
        <input
          className='form-input signup username'
          placeholder='Username'
          type='text'
          required
          value={username}
          onChange={({ target: { value } }) => setUsername(value)}
        />
        <input
          className='form-input signup email'
          placeholder='Email'
          type='email'
          required
          value={email}
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <input
          className='form-input signup password'
          placeholder='Password'
          type='password'
          required
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <input
          className='form-input signup confirm-password'
          placeholder='Confirm Password'
          type='password'
          required
          value={confirmPassword}
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
        <div className='form-button-container'>
          <button
            type='submit'
            className='form-button signup'
          >
            Sign Up
          </button>
          <button
            type='button'
            className='form-button signup'
            onClick={switchForm}
          >
            I Have an Account
          </button>
        </div>
      </AuthForm>
    </>
  );
}
