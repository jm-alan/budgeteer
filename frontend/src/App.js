import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import AccountPage from './components/Accounts';
import csrfetch from './store/csrf';
import { RestoreUser } from './store/session';

import './index.css';

export default function App () {
  const dispatch = useDispatch();

  const loaded = useSelector(state => state.session.loaded);
  const user = useSelector(state => state.session.user);
  const sidebar = useSelector(state => state.UX.sidebar);

  useEffect(() => {
    csrfetch.restoreCSRF();
  });

  useEffect(() => {
    dispatch(RestoreUser());
  }, [dispatch]);

  return loaded && (
    <div className='site-visual-organizer'>
      <NavBar />
      <div className={`main-site-container${
        sidebar ? ' shrink' : ' grow'
      }`}
      >
        <Switch>
          <Route exact path='/'>
            {user && <h1>Hi {`${user.firstName}`}!</h1>}
            {!user && <h1>Welcome! Please either log in or sign up to use this app.</h1>}
          </Route>
          <ProtectedRoute exact path='/accounts/'>
            <AccountPage />
          </ProtectedRoute>
        </Switch>
      </div>
    </div>
  );
}
