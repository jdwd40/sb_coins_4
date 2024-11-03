import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Heading,
  FormErrorMessage,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

interface LoginForm {
  email: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) throw error;
      
      toast({
        title: 'Welcome back!',
        status: 'success',
        duration: 3000,
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to sign in',
        status: 'error',
        duration: 5000,
      });
    }
  };

  return (
    <Container maxW="md" py={{ base: 12, md: 24 }}>
      <Box
        bg="white"
        py={8}
        px={{ base: 4, md: 10 }}
        shadow="base"
        rounded="lg"
      >
        <Stack spacing={6}>
          <Stack spacing={2} textAlign="center">
            <Heading size="lg">Welcome back</Heading>
            <Text color="gray.600">
              Enter your credentials to access your account
            </Text>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.email?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters',
                      },
                    })}
                  />
                  <InputRightElement>
                    <IconButton
                      variant="ghost"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password?.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                fontSize="md"
                isLoading={isSubmitting}
              >
                Sign in
              </Button>
            </Stack>
          </form>

          <Text textAlign="center">
            Don't have an account?{' '}
            <Button
              as={RouterLink}
              to="/register"
              variant="link"
              colorScheme="brand"
            >
              Sign up
            </Button>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default Login;