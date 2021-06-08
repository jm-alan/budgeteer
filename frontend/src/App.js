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

  useEffect(() => {
    CsrfFetch.restoreCSRF();
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
          <h1>Home!</h1>
        </Route>
      </Switch>
    </>
  );
}
