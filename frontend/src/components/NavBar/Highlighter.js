import { Link } from 'react-router-dom';

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children, type, onClick, to }) => (
  <div className='highlighter-wrapper'>

    {(() => ((type === 'link' && (
      <Link to={to}>
        <button>
          {children}
        </button>
      </Link>
    )) || (type === 'button' && (
      <button onClick={onClick}>
        {children}
      </button>
    ))))()}
    <div className='highlighter' />
  </div>
);
