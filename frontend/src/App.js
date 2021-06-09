import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Modal from './components/Modal';
import CsrfFetch from './store/csrf';
import { RestoreUser } from './store/session';

import './index.css';

export default function App () {
  const dispatch = useDispatch();

  const loaded = useSelector(state => state.session.loaded);
  const user = useSelector(state => state.session.user);

  useEffect(() => {
    CsrfFetch.restoreCSRF();
    CsrfFetch.setToken();
  }, []);

  useEffect(() => {
    dispatch(RestoreUser());
  }, [dispatch]);

  return loaded && (
    <>
      <Modal />
      <NavBar />
      <Switch>
        <Route exact path='/'>
          {user && <h1>Hi {`${user.firstName}`}!</h1>}
          {!user && <h1>Welcome! Please either log in or sign up to use this app.</h1>}
        </Route>
      </Switch>
    </>
  );
}
