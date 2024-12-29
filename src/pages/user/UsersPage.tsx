import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Heading,
  Input,
  Select,
  Table,
  TableContainer,
  Text,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useForm } from "react-hook-form";
import { createUser, getUsers, selectUserState } from "../../slices/user";
import { AxiosError, AxiosResponse, isAxiosError } from "axios";
import { useEffect } from "react";

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
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>();
  const { users } = useAppSelector(selectUserState);

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
    <GridItem
      colSpan={5}
      margin='40px'
    >
      <Flex justifyContent="space-between" position="relative">
        <Heading fontSize='3xl'>Usuarios</Heading>
      </Flex>
    </GridItem>
    <GridItem
      colSpan={3}
      display='flex'
      flexDir='column'
    >
      <form onSubmit={handleCreateButton} autoComplete="off">
        <FormControl isRequired mb='5px'>
          <FormLabel>Nombre</FormLabel>
          <Input
            placeholder='Nombre completo'
            {...register('fullname', { required: 'Por favor agrega el nombre del producto', minLength: 5 })}
          />
          {errors.fullname &&
          <Text
            fontStyle='italic'
            fontSize='xs'
            color='red'
          >
            {errors.fullname.message}
          </Text>}
        </FormControl>
        <FormControl isRequired mb='5px'>
          <FormLabel>Usuario</FormLabel>
          <Input
            placeholder='Nombre de usuario'
            {...register('username', { required: 'Por favor agrega el nombre de usuario', minLength: 5 })}
          />
        </FormControl>
        <FormControl isRequired mb='5px'>
          <FormLabel>Contraseña</FormLabel>
          <Input
            type='password'
            autoComplete="current-password"
            {...register('password', { required: 'Por favor agrega la contraseña', minLength: 5 })}
          />
        </FormControl>
        <FormControl isRequired mb='5px'>
          <FormLabel>Correo</FormLabel>
          <Input
            type='email' placeholder='Correo electrónico'
            {...register('email', { required: 'Por favor agrega el correo', minLength: 5 })}
          />
        </FormControl>
        <FormControl isRequired mb='15px'>
          <FormLabel>Cargo</FormLabel>
            <Select
              placeholder='Selecciona un tipo'
              {...register('role', { required: 'Por favor agrega elige el tipo de usuario', minLength: 5 })}
            >
              <option value="admin">Administrador</option>
              <option value="cashier">Cajero</option>
              <option value="waiter">Mesero</option>
            </Select>
        </FormControl>
        <Flex justifyContent='space-around'>
          <Button type="submit" colorScheme='green'>Agregar</Button>
          <Button colorScheme='blue' disabled>Editar</Button>
          <Button colorScheme='red' disabled>Eliminar</Button>
        </Flex>
      </form>
    </GridItem>
    <GridItem colSpan={2}>
      <TableContainer>
        <Table variant='simple'>
          <Thead>
            <Tr>
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
  </>
}

export default UsersPage;
