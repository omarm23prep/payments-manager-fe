interface ProtectedRoutesProps {
  isAuthenticated: boolean,
  role: string,
  path: string,
  children: any,
}

const ROLES_PERMISSIONS: any = {
  "admin": ['/home', '/users', '/billiard', '/orders', '/products'],
  "cashier": ['/home', '/billiard', '/orders'],
  "waiter": ['/home', '/orders'],
}

const ProtectedRoute = ({
  isAuthenticated,
  role,
  path,
  children
}: ProtectedRoutesProps) => {

  if (isAuthenticated && ROLES_PERMISSIONS[role].includes(path)) return children;

  return <h3>You don't have access to this page</h3>
}

export default ProtectedRoute;
