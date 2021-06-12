import Error from './Error';

import './index.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, onSubmit, error }) => (
  <>
    <Error error={error} />
    <form className='form auth-form' onSubmit={onSubmit}>
      {children}
      <button type='button' className='form-input form-button short cancel'>Cancel</button>
    </form>
  </>
);
