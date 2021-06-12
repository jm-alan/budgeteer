import { useDispatch } from 'react-redux';

import Error from './Error';
import { HideModal } from '../../store/UX';

import './index.css';

export default function AuthForm ({ children, onSubmit, error }) {
  const dispatch = useDispatch();

  const onCancel = () => dispatch(HideModal());
  return (
    <>
      <Error error={error} />
      <form className='form auth-form' onSubmit={onSubmit}>
        {children}
        <button
          type='button'
          className='form-input form-button short cancel'
          onClick={onCancel}
        >
          Cancel
        </button>
      </form>
    </>
  );
}
