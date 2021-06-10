import Error from './Error';

import './index.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, onSubmit, error }) => (
  <>
    <Error error={error} />
    <form className='form auth-form' onSubmit={onSubmit}>
      {children}
    </form>
  </>
);
