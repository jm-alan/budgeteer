import csrfetch from '../csrf';
import { SetCurrentModal } from '../modal';
import { HideModal } from '../UX';
import * as syncs from './syncs';

export const GetAllPersonals = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/users/me/personals/');
  dispatch(syncs.setPersonals(accounts));
};

export const GetAllCommunals = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/users/me/communals/');
  dispatch(syncs.setCommunals(accounts));
};

export const CreatePersonal = newAccount => async dispatch => {
  const { account } = await csrfetch.post('/api/accounts/personals/', newAccount);
  dispatch(syncs.addPersonal(account));
  dispatch(syncs.SetCurrentAccount(account));
  dispatch(SetCurrentModal(null));
  dispatch(HideModal());
};

export const CreateCommunal = newAccount => async dispatch => {
  const { account } = await csrfetch.post('/api/accounts/communals/', newAccount);
  dispatch(syncs.addCommunal(account));
  dispatch(syncs.SetCurrentAccount(account));
  dispatch(SetCurrentModal(null));
  dispatch(HideModal());
};

export const CreatePersonalItem = (id, newItem) => async dispatch => {
  const { item } = await csrfetch.post(`/api/accounts/personals/${id}/items/`, newItem);
  dispatch(syncs.addItem(item));
  dispatch(SetCurrentModal(null));
  dispatch(HideModal());
};

export const CreateCommunalItem = (id, newItem) => async dispatch => {
  const { item } = await csrfetch.post(`/api/accounts/communals/${id}/items/`, newItem);
  dispatch(syncs.addItem(item));
  dispatch(SetCurrentModal(null));
  dispatch(HideModal());
};

export const DeletePersonal = (id, password) => async dispatch => {
  const { success } = await csrfetch.delete(`/api/accounts/personals/${id}/`, { password });
  if (success) {
    dispatch(syncs.deletePersonal(id));
    dispatch(syncs.SetCurrentAccount(null));
    dispatch(SetCurrentModal(null));
    dispatch(HideModal());
  } else throw new Error('Something went wrong. Please refresh the page and try again.');
};

export const DeleteCommunal = (id, password) => async dispatch => {
  const { success } = await csrfetch.delete(`/api/accounts/communals/${id}/`, { password });
  if (success) {
    dispatch(syncs.deleteCommunal(id));
    dispatch(syncs.SetCurrentAccount(null));
    dispatch(SetCurrentModal(null));
    dispatch(HideModal());
  } else throw new Error('Something went wrong. Please refresh the page and try again.');
};

export const DeletePersonalItem = (accountId, itemId) => async dispatch => {
  const { success } = await csrfetch.delete(`/api/accounts/personals/${accountId}/items/${itemId}/`);
  if (success) dispatch(syncs.deleteItem(itemId));
  else throw new Error('Something went wrong. Please refresh the page and try again.');
};

export const DeleteCommunalItem = (accountId, itemId) => async dispatch => {
  const { success } = await csrfetch.delete(`/api/accounts/communals/${accountId}/items/${itemId}/`);
  if (success) dispatch(syncs.deleteItem(itemId));
  else throw new Error('Something went wrong. Please refresh the page and try again.');
};
