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
  // ignore the comment immediately below this one, it's to make my linter/formatter behave
  // eslint-disable-next-line default-param-last
  state = { // inline defining initial state; this is personal preference - declaring it
    list: [], // in a separate variable is totally fine. note that for each slice I'm
    personals: {}, // initializing it to either a default value that represents "nothing"
    communals: {}, // for itself, or what I want the default to be. If the object will have
    selected: 'all', // many other objects on it, an empty object will suffice. If the object
    current: null // will represent a single instance, I'm likely going to want to falsy check
  }, // or short circuit (&&) against it, so we'd want null, since {} is truthy.
  // Here I'm just destructuring my action; this is equivalent to action.type, action.accout, etc.
  { type, account, personals, communals, current, id }
) {
  switch (type) {
    case PERSONALS:
      // These first three are extremely straightforward; we take the thing in and set it to that property
      return { ...state, personals };
    case COMMUNALS:
      return { ...state, communals };
    case CURRENT:
      return { ...state, current };
    case ADD_PERSONAL:
      // Here we assign personals to our most up-to-date personal accounts already stored on our state,
      // and create one new property for the new account id, assigned to that account
      personals = { ...state.personals, [account.id]: account };
      // Here's where the shenanigans begin
      return {
        // You know this one
        ...state,
        // Here, we're reassigning personals to that new personals object, to ensure that the memory reference is
        // severed, so that any useSelectors listening to state.accounts.personals will re-render
        personals,
        // then we reassign list to a new array, which is the return value of this helper function
        list: returnAllOrOne(
          // the first argument is state.selected, which you'll see a little bit later is simply
          // a string that holds which list we're currently looking at; "all", "communals", or "personals"
          state.selected,
          // the second argument is the most up-to-date list of our personal accounts
          // since we haven't yet returned from this reducer, state.personals is still the old personals,
          // so we want to use the new personals object we just made
          personals,
          // and the last argument is the communals
          state.communals
        )
        // this helper function returns an array of either all the accounts, or just the personals or communals,
        // depending on the value of state.selected
      };
    case ADD_COMMUNAL:
      // Here we do exactly the same thing as in ADD_PERSONAL, all the way through
      communals = { ...state.communals, [account.id]: account };
      return {
        ...state,
        communals,
        list: returnAllOrOne(
          state.selected,
          state.personals,
          {
            ...state.communals,
            [account.id]: account
          }
        )
      };
    case DELETE_PERSONAL:
      // This is exactly what it looks like; we destroy the information at the ID we pass in
      delete state.personals[id];
      return {
        ...state,
        // making sure to reassign that property to a shallow copy of itself to break the memory reference
        // and guarantee triggering a re-render on anything listening to state.accounts.personals
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
          // If you aren't aware, Object.values is a static method that extracts all of the
          // values from an object and outputs them in an array
          // There also exists Object.keys, which does what you'd expect,
          // and Object.entries, which returns an array of tuples (arrays of length 2),
          // where tuple[0] is the key and tuple[1] is the value. Neat!
          // So all we're doing here is grabbing all of the accounts from both of our
          // account objects and spreading them into an array
          ...Object.values(state.personals),
          ...Object.values(state.communals)
        ],
        // Here we set that state.selected property we use above
        selected: 'all'
      };
    case SELECT_PERSONALS:
      return {
        ...state,
        // here we don't have to spread operator because Object.values already returns an array,
        // where above we have to concatenate two arrays together.
        // We also don't have to worry about breaking the memory reference, since an
        // ARRAY returned from Object.values can't possibly be === to an OBJECT that it parses
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
      // This is a cleanup case for when I want to be sure that leaving a component and coming back
      // again will always fetch brand new information
      return { list: [], personals: {}, communals: {}, current: null };
    // Beacuse it's important to me personally, I'd just like to draw attention to the importance
    // of a default return in your reducer.
    // Long story short, EVERY action you dispatch, ANYWHERE in your ENTIRE app, gets passed through
    // EVERY reducer in your app. If you don't have a default return here that preserves your state,
    // an action intended for a different reducer will cause this reducer function to return undefined.
    // Now your entire state.whatever is undefined, which in addition to breaking your app, will in
    // development throw a "reducer returned undefined" error because that should never happen.
    default:
      return state;
  }
}

// eslint-disable-next-line no-unused-vars
function returnAllOrOne (selected, personals, communals) {
  if (selected === 'all') return [...Object.values(personals), ...Object.values(communals)];
  else if (selected === 'personals') return Object.values(personals);
  else if (selected === 'communals') return Object.values(communals);
}
