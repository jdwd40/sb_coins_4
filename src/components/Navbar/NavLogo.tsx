import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Heading } from '@chakra-ui/react';
import { Coins } from 'lucide-react';

const NavLogo = () => {
  return (
    <RouterLink to="/">
      <Flex align="center" gap={2}>
        <Coins size={24} className="text-brand-500" />
        <Heading size="md" color="brand.500">
          CryptoSim
        </Heading>
      </Flex>
    </RouterLink>
  );
};

export default NavLogo;