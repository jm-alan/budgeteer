import './index.css';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, onSubmit }) => (
  <form className='auth-form' onSubmit={onSubmit}>
    {children}
  </form>
);
