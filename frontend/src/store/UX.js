const SHOWMODAL = 'UX/SHOWMODAL';
const HIDEMODAL = 'UX/HIDEMODAL';
const SIDEBAR = 'UX/SIDEBAR';
const HIDEBAR = 'UX/HIDEBAR';

export const ShowModal = () => ({
  type: SHOWMODAL
});

export const HideModal = () => ({
  type: HIDEMODAL
});

export const SideBar = () => ({
  type: SIDEBAR
});

export const HideBar = () => ({
  type: HIDEBAR
});

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { modal: false, sidebar: false },
  { type }
) {
  switch (type) {
    case SHOWMODAL:
      return { ...state, modal: true };
    case HIDEMODAL:
      return { ...state, modal: false };
    case SIDEBAR:
      return { ...state, sidebar: true };
    case HIDEBAR:
      return { ...state, sidebar: false };
    default:
      return state;
  }
}
