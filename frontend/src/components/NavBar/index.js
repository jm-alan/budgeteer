import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SignUpForm from '../Forms/SignUp';
import LogInForm from '../Forms/LogIn';
import { ShowModal } from '../../store/UX';
import { SetCurrentModal } from '../../store/modal';
import { LogOut } from '../../store/session';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  const popSignup = () => {
    dispatch(SetCurrentModal(SignUpForm));
    dispatch(ShowModal());
  };

  const popLogin = () => {
    dispatch(SetCurrentModal(LogInForm));
    dispatch(ShowModal());
  };

  const logOut = () => dispatch(LogOut());

  return (
    <nav
      className='navbar'
    >
      {user
        ? (
          <>
            <Link to='/'>
              <button>
                Home
              </button>
            </Link>
            <Link to='/accounts/'>
              <button>
                My Accounts
              </button>
            </Link>
            <button onClick={logOut}>
              Log Out
            </button>
          </>
          )
        : (
          <>
            <button
              className='navigation signup'
              onClick={popSignup}
            >
              Sign Up
            </button>
            <button
              className='navigation login'
              onClick={popLogin}
            >
              Log In
            </button>
          </>
          )}
    </nav>
  );
}
