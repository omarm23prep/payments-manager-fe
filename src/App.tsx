import {
  ChakraProvider,
  theme,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { Navigate, Route, Routes } from "react-router-dom"

import NavBar from "./components/navbar/NavBar";
import LoginPage from "./pages/login/LoginPage"
import HomePage from "./pages/homepage/HomePage";
import UsersPage from "./pages/user/UsersPage";
import ProtectedRoute from "./components/protectedroute/ProtectedRoute";
import { useAppSelector } from "./hooks"
import { selectAuthState } from "./slices/auth"

export const App = () => {
  const { isUserLoggedIn, loggedUser } = useAppSelector(selectAuthState);

  return <ChakraProvider theme={theme}>
    <Flex p="0px 20px">
      { !isUserLoggedIn ? <LoginPage/> :
        <Grid
          templateColumns='repeat(5, 1fr)'
          templateRows='repeat(12, 1fr)'
          h='100vh'
          w='100%'
          gap={5}
        >
          <GridItem
            rowSpan={1}
            colSpan={5}
            display='flex'
            alignItems='center'
            h='10vh'
          >
            <NavBar />
          </GridItem>
          <Routes>
            <Route path="/" element={ <Navigate to="/home" /> }/>
            <Route
              path="/home"
              element={
                <ProtectedRoute
                  isAuthenticated={isUserLoggedIn}
                  role={loggedUser?.role || ''}
                  path="/home"
                  children={<HomePage />}
                />
            }/>
            <Route
              path="/users"
              element={
                <ProtectedRoute
                  isAuthenticated={isUserLoggedIn}
                  role={loggedUser?.role || ''}
                  path="/users"
                  children={<UsersPage />}
                />
            }/>
          </Routes>
        </Grid>
      }
    </Flex>
  </ChakraProvider>
}
