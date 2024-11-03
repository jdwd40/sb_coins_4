import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Button, HStack, StackProps } from '@chakra-ui/react';
import { useAuth } from '../../contexts/AuthContext';

const NavLinks = (props: StackProps) => {
  const { user } = useAuth();

  return (
    <HStack spacing={4} {...props}>
      <Button
        as={RouterLink}
        to="/"
        variant="ghost"
        _activeLink={{ color: 'brand.500' }}
      >
        Market
      </Button>
      {user && (
        <Button
          as={RouterLink}
          to="/portfolio"
          variant="ghost"
          _activeLink={{ color: 'brand.500' }}
        >
          Portfolio
        </Button>
      )}
    </HStack>
  );
};

export default NavLinks;