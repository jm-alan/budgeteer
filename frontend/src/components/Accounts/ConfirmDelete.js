import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Error from '../Forms/Error';
import { DeleteCommunal, DeletePersonal, SetCurrentAccount } from '../../store/accounts';
import { SetCurrentModal } from '../../store/modal';
import { HideModal } from '../../store/UX';

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
          .then(() => {
            dispatch(SetCurrentAccount(null));
            dispatch(SetCurrentModal(null));
            dispatch(HideModal());
          })
          .catch(setError);
      } else {
        dispatch(DeleteCommunal(account.id, password))
          .then(() => {
            dispatch(SetCurrentAccount(null));
            dispatch(SetCurrentModal(null));
            dispatch(HideModal());
          })
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
    <>
      <Error error={error} />
      <form
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
          autoComplete={false}
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
      </form>
    </>
  );
}
