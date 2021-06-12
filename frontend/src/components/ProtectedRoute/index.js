import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function ProtectedRoute ({ exact, path, children }) {
  const user = useSelector(state => state.session.user);
  const loaded = useSelector(state => state.session.loaded);

  if (loaded && !user) return <Redirect to='/' />;
  return (
    <Route exact={exact} path={path}>
      {children}
    </Route>
  );
}
