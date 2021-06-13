import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DeleteCommunal, DeletePersonal } from '../../store/accounts/actions';
import AuthForm from '../Forms';

export default function ConfirmDelete () {
  const dispatch = useDispatch();

  const account = useSelector(state => state.accounts.current);

  const [confirmName, setConfirmName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    setError(null);
    if (confirmName === account.name && password) {
      if (account.balance !== undefined) {
        dispatch(DeletePersonal(account.id, password))
          .catch(setError);
      } else {
        dispatch(DeleteCommunal(account.id, password))
          .catch(setError);
      }
    } else {
      setError({
        message: 'Both fields are required',
        errors: [
          (() => confirmName === account.name
            ? null
            : 'You must enter the name of the account to delete.')(),
          (() => password
            ? null
            : 'You must enter your password.')()
        ]
      });
    }
  };

  return account && (
    <AuthForm
      error={error}
      className='confirm-delete'
      onSubmit={onSubmit}
    >
      <div className='confirm-delete-warning'>
        Are you sure you want to
        <span className='account-warning preamble'>
          {' permanently delete '}
        </span>
        your
        <span className='account-warning name'>
          {` ${account.name} `}
        </span>
        account?
        <br />
        Please enter the account name (<strong>{account.name}</strong>) and your password below to confirm.
      </div>
      <input
        className='form-input'
        type='text'
        value={confirmName}
        placeholder={account.name}
        required
        onChange={({ target: { value } }) => setConfirmName(value)}
      />
      <input
        className='form-input'
        value={password}
        placeholder='password'
        type='password'
        required
        onChange={({ target: { value } }) => setPassword(value)}
      />
      <button className='form-button' type='submit'>
        Confirm
      </button>
    </AuthForm>
  );
}
