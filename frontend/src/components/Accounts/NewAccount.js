import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { CreateCommunal, CreatePersonal } from '../../store/accounts/asyncs';
import CurrencyInput from '../../utils/validate';
import AuthForm from '../Forms';

export default function NewAccount () {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [communal, setCommunal] = useState(false);
  const [balance, setBalance] = useState('');
  const [error, setError] = useState(null);

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
        <CurrencyInput
          placeholder='Starting Balance 0.00'
          required
          value={balance}
          setValue={setBalance}
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
