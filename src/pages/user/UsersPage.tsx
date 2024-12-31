import {
  Flex,
  GridItem,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  InputGroup,
  InputLeftElement,
  Box,
  IconButton,
  Link,
  Icon
} from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useForm } from "react-hook-form";
import { createUser, getUsers, IUser, selectUserState } from "../../slices/user";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import UserDrawer from "../../components/users/UsersDrawer";
import { useDrawer } from "../../hooks/useDrawer";
import { FaRegEye } from "react-icons/fa";

type FormData = {
  fullname: string;
  username: string,
  password: string,
  email: string,
  role: string,
};

const UsersPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDrawer();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const { users } = useAppSelector(selectUserState);
  const [selectedUser, setSelectedUser] = useState<IUser>({
    "id": "",
    "fullname": "",
    "username": "",
    "password": "",
    "email": "",
    "role": "",
  });


  useEffect(() => {
    dispatch(getUsers())
  }, []);

  const resetForm = () => {
    setValue('email', '');
    setValue('fullname', '');
    setValue('password', '');
    setValue('role', '');
    setValue('username', '');
  }

  const handleCreateButton = handleSubmit(async (data: FormData, e) => {
    e?.preventDefault();
    
    const response = await dispatch(createUser({
      ...data,
    }));

    if (!isAxiosError(response.payload)) {
      const payload = response.payload as AxiosResponse;

      toast({
        title: 'Usuario creado.',
        description: `${payload.data?.message}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
      resetForm();
    } else {
      const payload = response.payload as AxiosError;
      const data = payload.response?.data as { errorMessage: string, errorName: string };

      toast({
        title: 'Usuario no creado.',
        description:
          `La creación del usuario falló debido al siguiente error: "${data.errorMessage}"`,
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  });

  return <>
    <GridItem colSpan={5}>
      <Heading size="md">Usuarios</Heading>
    </GridItem>
    <GridItem colSpan={1}></GridItem>
    <GridItem colSpan={3}>
      <Flex alignItems="center" mb="50px">
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input type='tel' placeholder='Buscar usuario' />
          </InputGroup>
      </Flex>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
              <Th>Editar</Th>
              <Th>Nombre</Th>
              <Th>Usuario</Th>
              <Th>Tipo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              users.map((user) => {
                return (
                  <Tr key={user.email}>
                    <Td>
                      <Link
                        as='button'
                        onClick={() => {
                          setSelectedUser({
                            id: user.id,
                            fullname: user.fullname,
                            username: user.username,
                            password: user.password ?? "",
                            email: user.email,
                            role: user.role
                          });
                          onOpen();
                        }}
                      >
                        <Icon as={FaRegEye} />
                      </Link>
                    </Td>
                    <Td>{user.fullname}</Td>
                    <Td>{user.username}</Td>
                    <Td>{user.role}</Td>
                  </Tr>
                )
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
    </GridItem>
    <GridItem colSpan={1}>
      <Box position='absolute' bottom={10} right={10}>
        <IconButton
          aria-label='Add button'
          borderRadius='full'
          colorScheme='purple'
          size='lg'
          shadow='lg'
          zIndex='1000'
          icon={<AddIcon />}
          onClick={onOpen}
        />
      </Box>
      <UserDrawer
        isOpen={isOpen}
        isNewUser={selectedUser.username !== "" ? false : true}
        onClose={() => {
          setSelectedUser({
            fullname: '',
            username: '',
            email: '',
            password: '',
            role: '',
          })
          onClose();
        }}
        user={{
          id: selectedUser.id,
          fullname: selectedUser.fullname,
          username: selectedUser.username,
          email: selectedUser.email,
          password: selectedUser.password ?? "",
          role: selectedUser.role,
          age: 0,
        }}
      />
    </GridItem>
  </>
}

export default UsersPage;
