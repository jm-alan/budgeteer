import { useDispatch, useSelector } from 'react-redux';

import { HideModal } from '../../store/UX';

import './index.css';

export default function Modal () {
  const dispatch = useDispatch();

  const show = useSelector(state => state.UX.modal);
  const user = useSelector(state => state.session.user);
  const after = useSelector(state => state.modal.after);
  const Current = useSelector(state => state.modal.current);

  const onClose = () => {
    dispatch(HideModal());
    user && after && after();
  };

  return show && Current && (
    <div
      className='modal-background'
      onClick={onClose}
    >
      <div
        className='modal-content prop-stopper'
        onClick={e => e.stopPropagation()}
      >
        <Current />
      </div>
    </div>
  );
}
