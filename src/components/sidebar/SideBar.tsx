import React from 'react';
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  VStack,
  Text,
  Link,
} from '@chakra-ui/react';
import { FiMenu} from 'react-icons/fi';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../../pages/homepage/HomePage';
import PredialPage from '../../pages/predial/PrediosPage';
import UsersPage from '../../pages/user/UsersPage';
import ProtectedRoute from '../protectedroute/ProtectedRoute';
import { useAppSelector } from '../../hooks';
import { selectAuthState } from '../../slices/auth';
import NavBar from '../navbar/NavBar';
import SettingsPage from '../../pages/settings/SettingsPage';

interface SidebarProps {
  links: { name: string; icon: React.ElementType; href: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ links }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isUserLoggedIn, loggedUser } = useAppSelector(selectAuthState);

  const SidebarContent = () => (
    <Box
      as="nav"
      bg="gray.800"
      color="white"
      w={{ base: 'full', md: '250px' }}
      h="full"
      p="4"
    >
      <VStack spacing="4" align="stretch">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            _hover={{ textDecoration: 'none', bg: 'gray.700' }}
            p="3"
            borderRadius="md"
            display="flex"
            alignItems="center"
          >
            <link.icon style={{ marginRight: '8px' }} />
            <Text>{link.name}</Text>
          </Link>
        ))}
      </VStack>
    </Box>
  );

  return (
    <Box minH="100vh" bg="gray.100">
      {/* Mobile Navbar */}
      <Flex
        as="header"
        align="center"
        justify="space-between"
        bg="gray.800"
        color="white"
        p="4"
        display={{ base: 'flex', md: 'none' }}
      >
        <IconButton
          aria-label="Open Menu"
          icon={<FiMenu />}
          variant="outline"
          onClick={onOpen}
        />
        <Text fontSize="xl" fontWeight="bold">
          My App
        </Text>
      </Flex>

      {/* Desktop Sidebar */}
      <Box
        display={{ base: 'none', md: 'block' }}
        pos="fixed"
        top="0"
        left="0"
        h="100vh"
        zIndex="1"
        w="250px"
        bg="gray.800"
      >
        <SidebarContent />
      </Box>

      {/* Mobile Sidebar */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent />
        </DrawerContent>
      </Drawer>

      {/* Main Content */}
      <Box ml={{ base: 0, md: '250px' }} p="4">
        <NavBar />
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
          <Route
            path="/predial"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLoggedIn}
                role={loggedUser?.role || ''}
                path="/predial"
                children={<PredialPage />}
              />
          }/>
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                isAuthenticated={isUserLoggedIn}
                role={loggedUser?.role || ''}
                path="/settings"
                children={<SettingsPage />}
              />
          }/>
          </Routes>
      </Box>
    </Box>
  );
};

export default Sidebar;
