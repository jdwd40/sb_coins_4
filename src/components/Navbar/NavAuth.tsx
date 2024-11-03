import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  StackProps,
  Spinner,
  useColorModeValue,
} from '@chakra-ui/react';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserFunds } from '../../hooks/useUserFunds';
import ThemeToggle from '../ThemeToggle';

const NavAuth = (props: StackProps) => {
  const { user, signOut, loading } = useAuth();
  const { data: funds, isLoading: fundsLoading } = useUserFunds(user?.id);
  const menuBg = useColorModeValue('white', 'dark.card');
  const menuBorder = useColorModeValue('gray.200', 'dark.border');

  if (loading) {
    return <Spinner size="sm" color="brand.500" />;
  }

  if (!user) {
    return (
      <HStack spacing={4} {...props}>
        <ThemeToggle />
        <Button
          as={RouterLink}
          to="/login"
          variant="ghost"
          colorScheme="brand"
        >
          Sign In
        </Button>
        <Button
          as={RouterLink}
          to="/register"
          colorScheme="brand"
        >
          Register
        </Button>
      </HStack>
    );
  }

  return (
    <HStack spacing={4} {...props}>
      <ThemeToggle />
      {fundsLoading ? (
        <Spinner size="sm" color="brand.500" />
      ) : (
        <Text fontWeight="medium">
          ${Number(funds?.funds).toLocaleString()}
        </Text>
      )}
      
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDown size={16} />}
          variant="ghost"
        >
          <HStack>
            <User size={16} />
            <Text>{user.user_metadata.username}</Text>
          </HStack>
        </MenuButton>
        <MenuList bg={menuBg} borderColor={menuBorder}>
          <MenuItem 
            icon={<LogOut size={16} />} 
            onClick={signOut}
            _hover={{ bg: 'brand.50', _dark: { bg: 'whiteAlpha.100' } }}
          >
            Sign Out
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default NavAuth;