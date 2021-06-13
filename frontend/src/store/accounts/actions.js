import csrfetch from '../csrf';
import { SetCurrentModal } from '../modal';
import { HideModal } from '../UX'; import * as types from './types';

export const setPersonals = personals => ({
  type: types.PERSONALS,
  personals
});

export const setCommunals = communals => ({
  type: types.COMMUNALS,
  communals
});

export const addPersonal = account => ({
  type: types.ADD_PERSONAL,
  account
});

export const addCommunal = account => ({
  type: types.ADD_COMMUNAL,
  account
});

export const addPersonalItem = item => ({
  type: types.ADD_PERSONAL_ITEM,
  item
});

export const addCommunalItem = item => ({
  type: types.ADD_COMMUNAL_ITEM,
  item
});

export const deletePersonal = id => ({
  type: types.DELETE_PERSONAL,
  id
});

export const deleteCommunal = id => ({
  type: types.DELETE_COMMUNAL,
  id
});

export const SetCurrentAccount = current => ({
  type: types.CURRENT,
  current
});

export const SelectAll = () => ({
  type: types.SELECT_ALL
});

export const SelectPersonals = () => ({
  type: types.SELECT_PERSONALS
});

export const SelectCommunals = () => ({
  type: types.SELECT_COMMUNALS
});

export const UnloadAccounts = () => ({
  type: types.UNLOAD
});

export const GetAllPersonals = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/users/me/personals/');
  dispatch(setPersonals(accounts));
};

export const GetAllCommunals = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/users/me/communals/');
  dispatch(setCommunals(accounts));
};

export const CreatePersonal = newAccount => async dispatch => {
  const { account } = await csrfetch.post('/api/accounts/personals/', newAccount);
  dispatch(addPersonal(account));
  dispatch(SetCurrentAccount(account));
  dispatch(SetCurrentModal(null));
  dispatch(HideModal());
};

export const CreateCommunal = newAccount => async dispatch => {
  const { account } = await csrfetch.post('/api/accounts/communals/', newAccount);
  dispatch(addCommunal(account));
  dispatch(SetCurrentAccount(account));
  dispatch(SetCurrentModal(null));
  dispatch(HideModal());
};

export const CreatePersonalItem = (id, newItem) => async dispatch => {
  const { item } = await csrfetch.post(`/api/accounts/personals/${id}/items/`, newItem);
  dispatch(addPersonalItem(item));
  dispatch(SetCurrentModal(null));
  dispatch(HideModal());
};

export const CreateCommunalItem = (id, newItem) => async dispatch => {
  const { item } = await csrfetch.post(`/api/accounts/communals/${id}/items/`, newItem);
  dispatch(addCommunalItem(item));
  dispatch(SetCurrentModal(null));
  dispatch(HideModal());
};

export const DeletePersonal = (id, password) => async dispatch => {
  const { success } = await csrfetch.delete(`/api/accounts/personals/${id}/`, { password });
  if (success) {
    dispatch(deletePersonal(id));
    dispatch(SetCurrentAccount(null));
    dispatch(SetCurrentModal(null));
    dispatch(HideModal());
  } else throw new Error('Something went wrong. Please refresh the page and try again.');
};

export const DeleteCommunal = (id, password) => async dispatch => {
  const { success } = await csrfetch.delete(`/api/accounts/communals/${id}/`, { password });
  if (success) {
    dispatch(deleteCommunal(id));
    dispatch(SetCurrentAccount(null));
    dispatch(SetCurrentModal(null));
    dispatch(HideModal());
  } else throw new Error('Something went wrong. Please refresh the page and try again.');
};
