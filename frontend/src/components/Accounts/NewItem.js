import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCommunalItem, CreatePersonalItem } from '../../store/accounts/asyncs';
import CurrencyInput from '../../utils/validate';
import AuthForm from '../Forms';

export default function NewItem () {
  const dispatch = useDispatch();

  const current = useSelector(state => state.accounts.current);

  const [name, setName] = useState('');
  const [income, setIsIncome] = useState(false);
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);

  const onSubmit = e => {
    e.preventDefault();
    const item = { name, amount, income };
    if (current.balance !== undefined) {
      dispatch(CreatePersonalItem(current.id, item))
        .catch(setError);
    } else {
      dispatch(CreateCommunalItem(current.id, item))
        .catch(setError);
    }
  };

  return (
    <AuthForm
      className='form new-item'
      onSubmit={onSubmit}
      error={error}
    >
      <label htmlFor='income'>
        Income?
        <input
          type='checkbox'
          className='form-input-income'
          id='income'
          checked={income}
          onChange={() => setIsIncome(i => !i)}
        />
      </label>
      <input
        type='text'
        required
        placeholder='Item Name'
        value={name}
        onChange={({ target: { value } }) => setName(value)}
        className='form-input'
      />
      <CurrencyInput
        placeholder='Amount 0.00'
        required
        value={amount}
        setValue={setAmount}
      />
      <button
        className='form-button'
        type='submit'
      >
        Create
      </button>
    </AuthForm>
  );
}
