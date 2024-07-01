import { useForm } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { ButtonComponent } from '@/components/button';
import { Link, useNavigate } from 'react-router-dom';
import { paths } from '@/router/paths.const';
interface AuthorizationFormInputs {
  email: string;
  password: string;
}

export const AuthorizationForm = ({
  mutation,
  isLogin,
}: {
  mutation: (data: AuthorizationFormInputs) => void;
  isLogin: boolean;
}) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthorizationFormInputs>();
  const navigate = useNavigate();

  const onSubmit = async (data: AuthorizationFormInputs) => {
    try {
      await mutation(data);
      if (isLogin) {
        navigate(paths.HOME);
      } else {
        navigate(paths.LOGIN);
      }
    } catch (error) {
      if ('message' in error) {
        setError('root', {
          message: error.message as string,
        });
      }
    }
  };

  return (
    <Box
      w="100%"
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      m="auto"
      mt={8}
    >
      <Box display="flex" justifyContent="center">
        {isLogin ? 'Login Page' : 'Registration Page'}
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4} align="flex-start">
          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address',
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <ButtonComponent
            type="submit"
            colorScheme="teal"
            isLoading={isSubmitting}
            width="full"
          >
            Confirm
          </ButtonComponent>
          {errors.root && <div>{errors.root.message}</div>}
        </VStack>
      </form>
      <Box display="flex" justifyContent="center">
        {isLogin ? (
          <Link to={paths.REGISTER}> Create an account </Link>
        ) : (
          <Link to={paths.LOGIN}> Log in </Link>
        )}
      </Box>
    </Box>
  );
};
