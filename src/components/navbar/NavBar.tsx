import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button, ButtonGroup,
  Flex,
  FlexProps,
  Heading,
  HStack,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logout, selectAuthState } from '../../slices/auth';

export interface NavBarProps extends FlexProps {}

const NAVBAR_OPTIONS: any[] = [];


const ProfileMenu = () => {
  const dispatch =  useAppDispatch();
  const navigate = useNavigate();

  const { loggedUser } = useAppSelector(selectAuthState);

  return (<Menu>
    <MenuButton
      as={Button}
      rounded={"full"}
      variant={"link"}
    >
      <Avatar size="lg" name={loggedUser?.fullname} src="" />
    </MenuButton>
    <MenuList>
      <MenuGroup title='Perfil'>
        <MenuItem>Mi Cuenta</MenuItem>
      </MenuGroup>
      <MenuDivider />
      <MenuGroup title='Sesión'>
        <MenuItem onClick={async () => {
          const response: any = await dispatch(logout());

          if (response.payload.status === 200) {
            navigate('/'); // Redirect to login page
          }
        }}>
          Cerrar Sesión
        </MenuItem>
      </MenuGroup>
    </MenuList>
  </Menu>)
}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <Flex flex={1}>
      <HStack>
        <Heading>
          Loma Bonita, Oax
        </Heading>
      </HStack>
      <HStack justify='flex-end' flex={2}>
        <ButtonGroup variant='ghost'>
          {
            NAVBAR_OPTIONS.map(
              (option) => <Button as={Link} key={option.name} to={option.path}>{option.name}</Button>
            )
          }
        </ButtonGroup>
        <ProfileMenu />
      </HStack>
    </Flex>
  )
}

export default NavBar;
