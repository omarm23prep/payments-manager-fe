import {
  ChakraProvider,
  theme,
  Flex,
} from "@chakra-ui/react"
import LoginPage from "./pages/login/LoginPage"
import { useAppSelector } from "./hooks"
import { selectAuthState } from "./slices/auth"
import { FiHome, FiSettings, FiFolder, FiUsers } from "react-icons/fi";
import Sidebar from "./components/sidebar/SideBar";

export const App = () => {
  const { isUserLoggedIn, loggedUser } = useAppSelector(selectAuthState);

  const links = [
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'Contribuyentes', icon: FiFolder, href: '/contribuyentes' },
    { name: 'Usuarios', icon: FiUsers, href: '/users' },
    { name: 'Configuracion', icon: FiSettings, href: '/settings'},
  ];

  return <ChakraProvider theme={theme}>
    <Flex p="0px 20px" w="100%" bg="gray.100">
      { !isUserLoggedIn ? <LoginPage/> :
        <Sidebar links={links} />
      }
    </Flex>
  </ChakraProvider>
}
