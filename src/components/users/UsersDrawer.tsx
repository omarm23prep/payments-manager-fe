import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  DrawerFooter,
  Box,
  FormLabel,
  useToast
} from "@chakra-ui/react"
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks";
// import "./Product.css";
import { useState } from "react";
import { createUser, removeUser, updateUser } from "../../slices/user";

export interface IUserDrawer {
  isOpen: boolean,
  onClose: () => void,
  isNewUser?: boolean,
  user: {
    id?: string,
    fullname: string,
    username: string,
    email: string,
    password: string,
    role: string,
    age?: number
  }
}

interface UserFormValues {
  fullname: string,
  username: string,
  email: string,
  password: string,
  role: string,
  age: number,
}

const validationSchema = Yup.object({
  fullname: Yup.string()
    .required('El nombre es requerido')
    .min(5, 'El nombre debe contener al menos 5 caracteres'),
  username: Yup.string()
    .required('El usuario es requerido')
    .min(5, 'EL usuario debe contener al menos 5 caracteres'),
  password: Yup.string()
    .required('La contraseña es requerido')
    .min(8, 'La contraseña debe contener al menos 8 caracteres'),
  role: Yup.string()
    .required('El rol es requerido'),
});



const UserDrawer = ({
  isOpen,
  isNewUser = false,
  onClose,
  user,
}: IUserDrawer) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const intialValues: UserFormValues = {
    fullname: user.fullname,
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
    age: user.age || 0,
  }
  const [saveButtonStatus, setSaveButtonStatus] = useState<boolean>(isNewUser);

  const handleCreate = (
    values: UserFormValues,
    { setSubmitting } : {
      setSubmitting: (isSubmitting: boolean) => void
    }
  ) => {
    dispatch(createUser({
      ...values,
    }))
    onClose();
    toast({
      title: 'Nuevo Usuario',
      description: "El usuario se ha guardado satisfactoriamente",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    setSubmitting(true);
  }

  const handleUpdate = (
    values: UserFormValues,
    { setSubmitting } : {
      setSubmitting: (isSubmitting: boolean) => void
    }
  ) => {
    dispatch(updateUser({
      id: user.id,
      ...values,
    }));
    onClose();
    toast({
      title: 'Cambios guardados.',
      description: "Los cambios en el usuario han sido modificados satisfactoriamente",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    setSubmitting(true);
  }

  const handleRemove = () => {
    dispatch(removeUser(user.id ?? ''));
    onClose();
    toast({
      title: 'Usuario Eliminado',
      description: "El usuario se ha eliminado satisfactoriamente",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, formik: FormikProps<UserFormValues>) => {
    setSaveButtonStatus(true);
    formik.handleChange(e);
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={() => {
          setSaveButtonStatus(false);
          onClose();
        }}
      >
        <DrawerOverlay />
          <Formik
            initialValues={intialValues}
            validationSchema={validationSchema}
            onSubmit={isNewUser ? handleCreate : handleUpdate}
          >
            {(formik) => (
              <Form>
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth='1px'>
                    Usuario
                  </DrawerHeader>
                  <DrawerBody>
                    <Stack spacing='24px'>
                      <Box>
                        <FormLabel htmlFor='fullname'>Nombre completo</FormLabel>
                        <Field
                          id='fullname'
                          name='fullname'
                          type="text"
                          value={formik.values.fullname}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e, formik)}
                        />
                        <ErrorMessage name="fullname" component="div" className="error-message" />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='username'>Usuario</FormLabel>
                        <Field
                          id='username'
                          name='username'
                          type="text"
                          value={formik.values.username}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e, formik)}
                        />
                        <ErrorMessage name="username" component="div" className="error-message" />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='email'>Correo</FormLabel>
                        <Field
                          id='email'
                          name='email'
                          type="email"
                          value={formik.values.email}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e, formik)}
                        />
                        <ErrorMessage name="email" component="div" className="error-message" />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Field
                          id='password'
                          name='password'
                          type="password"
                          value={formik.values.password}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e, formik)}
                        />
                        <ErrorMessage name="password" component="div" className="error-message" />
                      </Box>
                      <Box>
                        <FormLabel htmlFor='role'>Puesto</FormLabel>
                        <Field
                          id='role'
                          name='role'
                          as="select"
                          value={formik.values.role}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleOnChange(e, formik)}
                        >
                          <option value='admin'>Administrador</option>
                          <option value='cashier'>Cajero</option>
                        </Field>
                        <ErrorMessage name="role" component="div" className="error-message" />
                      </Box>
                    </Stack>
                  </DrawerBody>
                  <DrawerFooter borderTopWidth='1px'>
                    <Button variant='outline' mr={3} onClick={() => {
                      setSaveButtonStatus(false);
                      onClose()
                    }}>
                      Cancelar
                    </Button>
                    <Button
                      colorScheme='red'
                      mr={3}
                      visibility={isNewUser ? "hidden": "visible"}
                      onClick={handleRemove}
                    >
                      Eliminar
                    </Button>
                    <Button
                      type="submit"
                      colorScheme='blue'
                      disabled={!saveButtonStatus || formik.isSubmitting}
                    >
                        Guardar
                      </Button>
                  </DrawerFooter>
                </DrawerContent>
              </Form>
            )}
          </Formik>
      </Drawer>
    </>
  )
}

export default UserDrawer;
