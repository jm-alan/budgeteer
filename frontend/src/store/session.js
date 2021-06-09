import csrfetch from './csrf';

const USER = 'session/USER';

const LOAD = 'session/LOAD';

const setSession = (user = null) => ({
  type: USER,
  user
});

export const LoadSession = () => ({
  type: 'session/LOAD'
});

export const RestoreUser = () => async dispatch => {
  const { user } = await csrfetch.get('/api/session/');
  dispatch(setSession(user));
};

export const LogIn = credentials => async dispatch => {
  const { user } = await csrfetch.post('/api/session/', credentials);
  dispatch(setSession(user));
  if (!user) throw new Error('Invalid username or password');
};

export const SignUp = newUser => async dispatch => {
  const { user } = await csrfetch.post('/api/users/', newUser);
  dispatch(setSession(user));
};

export const LogOut = () => async dispatch => {
  await csrfetch.delete('/api/session/');
  dispatch(setSession());
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { user: null, loaded: false },
  { type, user }
) {
  switch (type) {
    case USER:
      return { ...state, user, loaded: true };
    case LOAD:
      return { ...state, loaded: true };
    default:
      return state;
  }
}
