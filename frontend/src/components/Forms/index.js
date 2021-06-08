import './index.css';

export default function AuthForm ({ children, onSubmit }) {
  return (
    <form className='auth-form' onSubmit={onSubmit}>
      {children}
    </form>
  );
}
