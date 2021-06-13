import * as types from './types';

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
