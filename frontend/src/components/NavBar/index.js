import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Highlighter from './Highlighter';
import SignUpForm from '../Forms/SignUp';
import LogInForm from '../Forms/LogIn';
import { HideBar, ShowModal, SideBar } from '../../store/UX';
import { SetCurrentModal } from '../../store/modal';
import { LogIn, LogOut } from '../../store/session';

export default function NavBar () {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);
  const sidebar = useSelector(state => state.UX.sidebar);
  const modal = useSelector(state => state.UX.modal);

  const popSignup = (e) => {
    e.stopPropagation();
    dispatch(SetCurrentModal(SignUpForm));
    dispatch(ShowModal());
  };

  const popLogin = (e) => {
    e.stopPropagation();
    dispatch(SetCurrentModal(LogInForm));
    dispatch(ShowModal());
  };

  const demoLogin = () => dispatch(LogIn({
    identification: 'demo@budgeteer.io',
    password: 'password'
  }));

  const logOut = () => dispatch(LogOut());

  const hamburgerClick = (e) => {
    e.stopPropagation();
    !sidebar && dispatch(SideBar());
    sidebar && dispatch(HideBar());
  };

  useEffect(() => {
    const hidebar = () => dispatch(HideBar());
    if (sidebar && !modal) document.addEventListener('click', hidebar);
    return () => document.removeEventListener('click', hidebar);
  }, [sidebar, modal, dispatch]);

  return (
    <nav className={sidebar ? 'grow' : 'shrink'}>
      <button
        onClick={hamburgerClick}
        className={`navbar-display${
          sidebar ? ' close' : ' open'
        }`}
      >
        <div className='navbar-hamburger top' />
        <div className='navbar-hamburger middle' />
        <div className='navbar-hamburger bottom' />
      </button>
      <div className='nav-sliding-container'>
        {user
          ? (
            <>
              <Highlighter type='link' to='/'>
                Home
              </Highlighter>
              <Highlighter type='link' to='/accounts/'>
                My Accounts
              </Highlighter>
              <Highlighter type='button' onClick={logOut}>
                Log Out
              </Highlighter>
            </>
            )
          : (
            <>
              <Highlighter type='button' onClick={popSignup}>
                Sign Up
              </Highlighter>
              <Highlighter type='button' onClick={popLogin}>
                Log In
              </Highlighter>
              <Highlighter type='button' onClick={demoLogin}>
                Demo User
              </Highlighter>
            </>
            )}
      </div>
    </nav>
  );
}
