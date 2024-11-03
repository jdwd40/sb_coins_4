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
  Progress,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>();

  const password = watch('password', '');

  const getPasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(password)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password);

  const getPasswordStrengthColor = (strength: number) => {
    if (strength <= 25) return 'red';
    if (strength <= 50) return 'orange';
    if (strength <= 75) return 'yellow';
    return 'green';
  };

  const onSubmit = async (data: RegisterForm) => {
    try {
      const { error } = await signUp(data.email, data.password, data.username);
      if (error) throw error;
      
      toast({
        title: 'Account created successfully!',
        description: 'Welcome to CryptoSim',
        status: 'success',
        duration: 3000,
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to create account',
        status: 'error',
        duration: 5000,
      });
    }
  };

  const passwordRequirements = [
    { text: 'At least 8 characters', met: password.length >= 8 },
    { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
    { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
    { text: 'Contains number or special character', met: /[0-9!@#$%^&*]/.test(password) },
  ];

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
            <Heading size="lg">Create an account</Heading>
            <Text color="gray.600">
              Join CryptoSim and start trading
            </Text>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={5}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  {...register('username', {
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'Username must be at least 3 characters',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.username?.message}
                </FormErrorMessage>
              </FormControl>

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
                      validate: (value) =>
                        getPasswordStrength(value) === 100 ||
                        'Password does not meet requirements',
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
                {password && (
                  <Box mt={2}>
                    <Progress
                      value={passwordStrength}
                      size="sm"
                      colorScheme={getPasswordStrengthColor(passwordStrength)}
                      mb={2}
                    />
                    <Stack spacing={1}>
                      {passwordRequirements.map((req, index) => (
                        <HStack key={index} fontSize="sm" color={req.met ? 'green.500' : 'red.500'}>
                          {req.met ? <Check size={14} /> : <X size={14} />}
                          <Text>{req.text}</Text>
                        </HStack>
                      ))}
                    </Stack>
                  </Box>
                )}
                <FormErrorMessage>
                  {errors.password?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                />
                <FormErrorMessage>
                  {errors.confirmPassword?.message}
                </FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="brand"
                size="lg"
                fontSize="md"
                isLoading={isSubmitting}
              >
                Create Account
              </Button>
            </Stack>
          </form>

          <Text textAlign="center">
            Already have an account?{' '}
            <Button
              as={RouterLink}
              to="/login"
              variant="link"
              colorScheme="brand"
            >
              Sign in
            </Button>
          </Text>
        </Stack>
      </Box>
    </Container>
  );
};

export default Register;