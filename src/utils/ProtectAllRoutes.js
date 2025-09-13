// This file will wrap all routes with ProtectedRoute except login
import ProtectedRoute from '../components/ProtectedRoute';

export const wrapWithProtection = (component) => {
  return <ProtectedRoute>{component}</ProtectedRoute>;
};