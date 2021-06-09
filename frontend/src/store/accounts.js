import csrfetch from './csrf';

const ALL = 'accounts/ALL';
const PERSONAL = 'accounts/PERSONAL';
const COMMUNAL = 'accounts/COMMUNAL';

const setAll = all => ({
  type: ALL,
  all
});

const setPersonals = personals => ({
  type: PERSONAL,
  personals
});

const setCommunals = communals => ({
  type: COMMUNAL,
  communals
});

export const GetAllAccounts = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/me/accounts/');
  dispatch(setAll(accounts));
};

export const GetAllPersonals = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/me/personals/');
  dispatch(setPersonals(accounts));
};

export const GetAllCommunals = () => async dispatch => {
  const { accounts } = await csrfetch.get('/api/me/communals/');
  dispatch(setCommunals(accounts));
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { all: [], personals: [], communals: [] },
  { type, all, personals, communals }
) {
  switch (type) {
    case ALL:
      return { ...state, all };
    case PERSONAL:
      return { ...state, personals };
    case COMMUNAL:
      return { ...state, communals };
    default:
      return state;
  }
}
