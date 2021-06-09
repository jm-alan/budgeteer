import csrfetch from './csrf';

const LIST = 'accounts/LIST';
const CURRENT = 'accounts/CURRENT';
const UNLOAD = 'accounts/UNLOAD';

const setList = list => ({
  type: LIST,
  list
});

export const setCurrent = current => ({
  type: CURRENT,
  current
});

export const UnloadAccounts = () => ({
  type: UNLOAD
});

export const GetAllAccounts = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/me/accounts/');
  dispatch(setList(accounts));
};

export const GetAllPersonals = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/me/personals/');
  dispatch(setList(accounts));
};

export const GetAllCommunals = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/me/communals/');
  dispatch(setList(accounts));
};

export const CreatePersonal = newAccount => async dispatch => {
  const { account } = await csrfetch.post('/api/accounts/personals/', newAccount);
  dispatch(setCurrent(account));
};

export const CreateCommunal = newAccount => async dispatch => {
  const { account } = await csrfetch.post('/api/accounts/communals/', newAccount);
  dispatch(setCurrent(account));
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { list: [], current: null },
  { type, list, current }
) {
  switch (type) {
    case LIST:
      return { ...state, list };
    case CURRENT:
      return { ...state, current };
    case UNLOAD:
      return { list: [], current: null };
    default:
      return state;
  }
}
