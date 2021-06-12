import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CreateCommunal, CreatePersonal } from '../../store/accounts';
import { SetCurrentModal } from '../../store/modal';
import { HideModal } from '../../store/UX';

export default function NewAccountForm () {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [communal, setCommunal] = useState(false);
  const [balance, setBalance] = useState('');
  const [shouldMoveCursor, setShouldMoveCursor] = useState(true);
  const [cursorMovedOnce, setCursorMovedOnce] = useState(false);

  const balanceRef = useRef(null);

  const validateBalance = ({ target: { value } }) => {
    if (
      !value ||
      value.match(/^[0-9]+$/) ||
      value.match(/^[0-9]+\.[0-9]{2}$/)
    ) {
      setBalance(value);
      setShouldMoveCursor(false);
    } else if (value.match(/^[0-9]+\.[0-9]{2}$/)) setShouldMoveCursor(false);
    else if (
      value.match(/^[0-9]+\.$/) ||
        value.match(/^[0-9]+\.[0-9]{1}$/)
    ) {
      setBalance(value.padEndUntil(/^[0-9]+\.[0-9]{2}$/, 0));
      setShouldMoveCursor(true);
      setCursorMovedOnce(false);
    } else if (value.match(/^[0-9]+\.[0-9]{3,}$/)) {
      setBalance(value.truncateUntil(/^[0-9]+\.[0-9]{2}$/));
      setShouldMoveCursor(true);
    }
  };

  useEffect(() => {
    if (balance.match(/^[0-9]+\.00$/) && shouldMoveCursor) {
      balanceRef.current.setSelectionRange(balance.length - 2, balance.length - 2);
      setShouldMoveCursor(false);
    } else if (balance.match(/^[0-9]+\.[1-9]0$/) && shouldMoveCursor && !cursorMovedOnce) {
      balanceRef.current.setSelectionRange(balance.length - 1, balance.length - 1);
      setShouldMoveCursor(false);
      setCursorMovedOnce(true);
    } else if (shouldMoveCursor) setShouldMoveCursor(false);
  }, [balance, shouldMoveCursor, cursorMovedOnce]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!communal) dispatch(CreatePersonal({ name, balance }));
    else dispatch(CreateCommunal({ name }));
  };

  return (
    <form
      className='form new-account'
      onSubmit={onSubmit}
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
    </form>
  );
}
