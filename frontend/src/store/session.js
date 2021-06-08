import csrfetch from './csrf';

const USER = 'session/USER';

const LOAD = 'session/LOAD';

const setSession = (user = null) => ({
  type: USER,
  user
});

export const RestoreUser = () => async dispatch => {
  const res = await csrfetch('/api/session/');
  const { user } = res.data;
  dispatch(setSession(user));
};

export const LogIn = credentials => async dispatch => {
  const res = await csrfetch('/api/session/', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });
  const { user } = res.data;
  dispatch(setSession(user));
  if (!user) throw new Error('Invalid username or password');
};

export const SignUp = newUser => async dispatch => {
  const res = await csrfetch('/api/users/', {
    method: 'POST',
    body: JSON.stringify(newUser)
  });
  const { user } = res.data;
  dispatch(setSession(user));
};

export const LogOut = () => async dispatch => {
  await csrfetch('/api/session/', {
    method: 'DELETE'
  });
  dispatch(setSession());
};

export default function reducer (
  state = { user: null, loaded: false },
  { type, user }
) {
  switch (type) {
    case USER:
      return { ...state, user };
    case LOAD:
      return { ...state, loaded: true };
    default:
      return state;
  }
}
