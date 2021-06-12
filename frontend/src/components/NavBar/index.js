import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import SignUpForm from '../Forms/SignUp';
import LogInForm from '../Forms/LogIn';
import { HideBar, ShowModal, SideBar } from '../../store/UX';
import { SetCurrentModal } from '../../store/modal';
import { LogOut } from '../../store/session';

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
              <div className='highlighter-wrapper'>
                <Link to='/'>
                  <button>
                    Home
                  </button>
                </Link>
                <div className='highlighter' />
              </div>
              <div className='highlighter-wrapper'>
                <Link to='/accounts/'>
                  <button>
                    My Accounts
                  </button>
                </Link>
                <div className='highlighter' />
              </div>
              <div className='highlighter-wrapper'>
                <button onClick={logOut}>
                  Log Out
                </button>
                <div className='highlighter' />
              </div>
            </>
            )
          : (
            <>
              <div className='highlighter-wrapper'>
                <button
                  className='navigation signup'
                  onClick={popSignup}
                >
                  Sign Up
                </button>
                <div className='highlighter' />
              </div>
              <div className='highlighter-wrapper'>
                <button
                  className='navigation login'
                  onClick={popLogin}
                >
                  Log In
                </button>
                <div className='highlighter' />
              </div>
            </>
            )}
      </div>
    </nav>
  );
}
