import * as types from './types';

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
  { type, account, item, personals, communals, current, id }
) {
  account && account.balance && (
    personals = { ...state.personals, [account.id]: account }
  );
  account && account.balance === undefined && (
    communals = { ...state.communals, [account.id]: account }
  );
  const list = returnAllOrOne(
    state.selected, personals ?? state.personals, communals ?? state.communals
  );
  switch (type) {
    case types.PERSONALS:
      return { ...state, personals, list };
    case types.COMMUNALS:
      return { ...state, communals, list };
    case types.CURRENT:
      return { ...state, current };
    case types.ADD_PERSONAL:
      personals = { ...state.personals, [account.id]: account };
      return { ...state, personals, list };
    case types.ADD_COMMUNAL:
      return { ...state, communals, list };
    case types.ADD_ITEM:
      state.current.Items[item.id] = item;
      if (state.current.balance !== undefined) {
        state.personals[state.current.id].Items[item.id] = item;
      } else state.communals[state.current.id].Items[item.id] = item;
      return {
        ...state,
        current: {
          ...state.current,
          Items: { ...state.current.Items }
        }
      };
    case types.DELETE_PERSONAL:
      delete state.personals[id];
      return {
        ...state,
        personals: { ...state.personals },
        list: returnAllOrOne(state.selected, state.personals, state.communals)
      };
    case types.DELETE_COMMUNAL:
      delete state.communals[id];
      return {
        ...state,
        communals: { ...state.communals },
        list: returnAllOrOne(state.selected, state.personals, state.communals)
      };
    case types.DELETE_ITEM:
      delete state.current.Items[id];
      if (state.current.balance !== undefined) {
        delete state.personals[state.current.id].Items[id];
      } else delete state.communals[state.current.id].Items[id];
      return {
        ...state,
        current: {
          ...state.current,
          Items: { ...state.current.Items }
        }
      };
    case types.SELECT_ALL:
      return {
        ...state,
        list: [
          ...Object.values(state.personals),
          ...Object.values(state.communals)
        ],
        selected: 'all'
      };
    case types.SELECT_PERSONALS:
      return {
        ...state,
        list: Object.values(state.personals),
        selected: 'personals'
      };
    case types.SELECT_COMMUNALS:
      return {
        ...state,
        list: Object.values(state.communals),
        selected: 'communals'
      };
    case types.UNLOAD:
      return { list: [], personals: {}, communals: {}, current: null, selected: 'all' };
    default:
      return state;
  }
}

function returnAllOrOne (selected, personals, communals) {
  if (selected === 'all') return [...Object.values(personals), ...Object.values(communals)];
  else if (selected === 'personals') return Object.values(personals);
  else if (selected === 'communals') return Object.values(communals);
}
