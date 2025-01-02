import UnauthorizePage from "../../pages/unauthorize/UnauthorizePage";

interface ProtectedRoutesProps {
  isAuthenticated: boolean,
  role: string,
  path: string,
  children: any,
}

const ROLES_PERMISSIONS: any = {
  "admin": ['/home', '/users', '/predial', '/orders', '/services', '/contribuyentes'],
  "cashier": ['/home', '/predial', '/ordservicesers'],
  "waiter": ['/home', '/orders'],
}

const ProtectedRoute = ({
  isAuthenticated,
  role,
  path,
  children
}: ProtectedRoutesProps) => {

  if (isAuthenticated && ROLES_PERMISSIONS[role].includes(path)) return children;

  return <UnauthorizePage />
}

export default ProtectedRoute;
