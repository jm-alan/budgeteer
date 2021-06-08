const CURRENT = 'modal/CURRENT';

const AFTER = 'modal/AFTER';

const DOWN = 'modal/DOWN';

export const SetCurrentModal = current => ({
  type: CURRENT,
  current
});

export default function reducer (
  state = { current: null, after: null },
  { type, current, after }
) {
  switch (type) {
    case CURRENT:
      return { ...state, current };
    case AFTER:
      return { ...state, after };
    case DOWN:
      return { current: null, after: null };
    default:
      return state;
  }
}
