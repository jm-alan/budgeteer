import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { CreateCommunal, CreatePersonal } from '../../store/accounts/asyncs';
import { createEffect, createValidator } from '../../utils/validate';
import AuthForm from '../Forms';

export default function NewAccount () {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [communal, setCommunal] = useState(false);
  const [balance, setBalance] = useState('');
  const [shouldMoveCursor, setShouldMoveCursor] = useState(true);
  const [cursorMovedOnce, setCursorMovedOnce] = useState(false);
  const [error, setError] = useState(null);

  const balanceRef = useRef(null);

  const validateBalance = createValidator(
    setBalance, setShouldMoveCursor, setCursorMovedOnce
  );

  useEffect(() => {
    createEffect(
      balance, balanceRef, shouldMoveCursor,
      setShouldMoveCursor, cursorMovedOnce, setCursorMovedOnce
    )();
  }, [balance, shouldMoveCursor, cursorMovedOnce]);

  const onSubmit = e => {
    e.preventDefault();
    if (!communal) {
      dispatch(CreatePersonal({ name, balance }))
        .catch(setError);
    } else {
      dispatch(CreateCommunal({ name }))
        .catch(setError);
    }
  };

  return (
    <AuthForm
      onSubmit={onSubmit}
      error={error}
    >
      <label htmlFor='personal'>
        Shared?
        <input
          type='checkbox'
          className='form-input-personal'
          id='personal'
          checked={communal}
          onChange={() => setCommunal(c => !c)}
        />
      </label>
      <input
        type='text'
        required
        placeholder='Account Name'
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        className='form-input'
      />
      {!communal && (
        <input
          ref={balanceRef}
          type='text'
          id='starting-balance'
          placeholder='Starting balance 0.00'
          className='form-input'
          onChange={validateBalance}
          value={balance}
        />
      )}
      <button
        className='form-button'
        type='submit'
      >
        Create
      </button>
    </AuthForm>
  );
}
