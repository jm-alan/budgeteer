import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Modal from './components/Modal';
import { restoreCSRF } from './store/csrf';
import { RestoreUser } from './store/session';

import './index.css';

export default function App () {
  const dispatch = useDispatch();

  useEffect(() => {
    restoreCSRF();
  }, []);

  useEffect(() => {
    dispatch(RestoreUser());
  }, [dispatch]);

  return (
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
