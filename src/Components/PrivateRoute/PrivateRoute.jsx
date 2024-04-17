import { Navigate, Outlet } from 'react-router-dom';
import { checkRole, isTokenValid } from '../../../utils';

const PrivateRoute = ({ role, path }) => {
  if (isTokenValid() && checkRole(role)) {
    return <Outlet />;
  } else return <Navigate to={path} />;
};

export default PrivateRoute;
