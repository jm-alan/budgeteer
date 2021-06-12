import csrfetch from './csrf';
import { SetCurrentModal } from './modal';
import { HideModal } from './UX';

// *********************************************** Constants/Types ************************************************
// **************** We use these to clearly label what our synchronous Action Creator functions do ****************

const PERSONALS = 'accounts/PERSONALS';
const COMMUNALS = 'accounts/COMMUNALS';
const CURRENT = 'accounts/CURRENT';
const UNLOAD = 'accounts/UNLOAD';
const ADD_PERSONAL = 'accounts/PERSONALS/ADD';
const ADD_COMMUNAL = 'accounts/COMMUNALS/ADD';
const DELETE_PERSONAL = 'accounts/PERSONALS/DELETE';
const DELETE_COMMUNAL = 'accounts/COMMUNALS/DELETE';
const SELECT_ALL = 'accounts/SELECT/ALL';
const SELECT_PERSONALS = 'accounts/SELECT/PERSONALS';
const SELECT_COMMUNALS = 'accounts/SELECT/COMMUNALS';

// ***************************************** Synchronous Action Creators ******************************************
// *************************** These do not interact directly with the backend/database ***************************
// ******************************** These are simply functions that return objects ********************************

const setPersonals = personals => ({
  type: PERSONALS,
  personals
});

const setCommunals = communals => ({
  type: COMMUNALS,
  communals
});

const addPersonal = account => ({
  type: ADD_PERSONAL,
  account
});

const addCommunal = account => ({
  type: ADD_COMMUNAL,
  account
});

const deletePersonal = id => ({
  type: DELETE_PERSONAL,
  id
});

const deleteCommunal = id => ({
  type: DELETE_COMMUNAL,
  id
});

export const SetCurrentAccount = current => ({
  type: CURRENT,
  current
});

// ********************** Notice not all of my synchronous action creators take in arguments **********************
// ****** That's because sometimes I just need to trigger logic in my reducer for information I already have ******

export const SelectAll = () => ({
  type: SELECT_ALL
});

export const SelectPersonals = () => ({
  type: SELECT_PERSONALS
});

export const SelectCommunals = () => ({
  type: SELECT_COMMUNALS
});

export const UnloadAccounts = () => ({
  type: UNLOAD
});

// ************************************** Thunks/Asynchronous Action Creators **************************************
// *********************************** These are functions that return functions ***********************************
// ****** The outer function is what you invoke when you pass it into the useDispatch dispatch in a component ******
// ***************** The inner function is caught by the redux-thunk middleware, which subsequently ****************
// ****************** invokes that function with dispatch, giving you the ability to use it within *****************
// ********************************************** your function body ***********************************************

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

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = {
    list: [],
    personals: {},
    communals: {},
    selected: 'all',
    current: null,
    loaded: false
  },
  { type, account, personals, communals, current, id }
) {
  switch (type) {
    case PERSONALS:
      return {
        ...state,
        personals,
        list: returnAllOrOne(state.selected, personals, state.communals)
      };
    case COMMUNALS:
      return {
        ...state,
        communals,
        list: returnAllOrOne(state.selected, state.personals, communals)
      };
    case CURRENT:
      return { ...state, current };
    case ADD_PERSONAL:
      personals = { ...state.personals, [account.id]: account };
      return {
        ...state,
        personals,
        list: returnAllOrOne(state.selected, personals, state.communals)
      };
    case ADD_COMMUNAL:
      communals = { ...state.communals, [account.id]: account };
      return {
        ...state,
        communals,
        list: returnAllOrOne(state.selected, state.personals, communals)
      };
    case DELETE_PERSONAL:
      delete state.personals[id];
      return {
        ...state,
        personals: { ...state.personals },
        list: returnAllOrOne(state.selected, state.personals, state.communals)
      };
    case DELETE_COMMUNAL:
      delete state.communals[id];
      return {
        ...state,
        communals: { ...state.communals },
        list: returnAllOrOne(state.selected, state.personals, state.communals)
      };
    case SELECT_ALL:
      return {
        ...state,
        list: [
          ...Object.values(state.personals),
          ...Object.values(state.communals)
        ],
        // Here we set that state.selected property we use above
        selected: 'all'
      };
    case SELECT_PERSONALS:
      return {
        ...state,
        list: Object.values(state.personals),
        selected: 'personals'
      };
    case SELECT_COMMUNALS:
      return {
        ...state,
        list: Object.values(state.communals),
        selected: 'communals'
      };
    case UNLOAD:
      return { list: [], personals: {}, communals: {}, current: null };
    default:
      return state;
  }
}

function returnAllOrOne (selected, personals, communals) {
  if (selected === 'all') return [...Object.values(personals), ...Object.values(communals)];
  else if (selected === 'personals') return Object.values(personals);
  else if (selected === 'communals') return Object.values(communals);
}
