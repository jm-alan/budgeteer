const SHOWMODAL = 'UX/SHOWMODAL';

const HIDEMODAL = 'UX/HIDEMODAL';

export const ShowModal = () => ({ type: SHOWMODAL });

export const HideModal = () => ({ type: HIDEMODAL });

export default function reducer (
  state = { modal: false },
  { type }
) {
  switch (type) {
    case SHOWMODAL:
      return { ...state, modal: true };
    case HIDEMODAL:
      return { ...state, modal: false };
    default:
      return state;
  }
}
