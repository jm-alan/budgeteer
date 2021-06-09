// eslint-disable-next-line import/no-anonymous-default-export
export default ({ error }) => error && (
  <div className='error-bounding-box'>
    <h4>{error.message}</h4>
    {error.errors.map((err, idx) => (
      <div
        key={idx}
        className='error-message'
      >
        {err}
      </div>
    ))}
  </div>
);
