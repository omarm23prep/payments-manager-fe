import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field } from 'formik';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  FlexProps
} from '@chakra-ui/react';
import { login, selectAuthState } from '../../slices/auth';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface LoginPageProps extends FlexProps {}

const LoginPage: React.FC<LoginPageProps> = ({
  ...flexProps
}) => {
  const { isUserLoggedIn } = useAppSelector(selectAuthState);
  const navigate = useNavigate();
  const dispatch =  useAppDispatch();

  const handleLogin = (username: string, password: string) => {
    const credentials = {
      username,
      password,
    };
    dispatch(login(credentials));
  }

  useEffect(() => {
    if (isUserLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [isUserLoggedIn, navigate])

  return (
    <Flex align='center' justify='center' minW='100vw' minH='100vh' bg='gray.100'>
      <Flex bg='white' p={6} rounded='md' w='md' h='md' align='center' justify='center'>
        <Formik
          initialValues={{
            username: '',
            password: '',
            rememberMe: false
          }}
          onSubmit={(values) => {
            const { username, password } = values;
            handleLogin(username, password);
          }}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit} autoComplete='off'>
              <VStack spacing={4} align='flex-start' w='sm'>
                <FormControl>
                  <FormLabel htmlFor='username'>Usuario</FormLabel>
                  <Field
                    as={Input}
                    id='username'
                    name='username'
                    type='text'
                    variant='filled'
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor='password'>Contraseña</FormLabel>
                  <Field
                    as={Input}
                    id='password'
                    name='password'
                    type='password'
                    variant='filled'
                    validate={(value: string) => {
                      let error;

                      if (value.length < 5) {
                        error = 'La contraseña debe contener al menos 6 caracteres';
                      }

                      return error;
                    }}
                  />
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>
                <Button type='submit' colorScheme='purple' width='full'>
                  Login
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
