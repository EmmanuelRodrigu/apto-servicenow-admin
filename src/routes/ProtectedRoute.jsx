import { Navigate } from 'react-router-dom';
import { canViewModules } from '@utils';

export const ProtectedRoute = ({ children, modulePermissions, nameRoute }) => {
  return canViewModules(modulePermissions, nameRoute) ?
    children :
    <Navigate to={`/not-permissions`} />;
}