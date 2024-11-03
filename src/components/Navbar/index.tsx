import React from 'react';
import { Box, Flex, HStack, IconButton, useDisclosure, useColorModeValue } from '@chakra-ui/react';
import { Menu } from 'lucide-react';
import NavLogo from './NavLogo';
import NavLinks from './NavLinks';
import NavAuth from './NavAuth';
import MobileNav from './MobileNav';

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const bg = useColorModeValue('white', 'dark.card');
  const borderColor = useColorModeValue('gray.200', 'dark.border');

  return (
    <Box 
      as="nav" 
      bg={bg} 
      borderBottom="1px" 
      borderColor={borderColor}
      position="sticky" 
      top={0} 
      zIndex={1000}
      transition="all 0.2s"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        px={4}
        py={4}
        align="center"
        justify="space-between"
      >
        <HStack spacing={8}>
          <NavLogo />
          <NavLinks display={{ base: 'none', md: 'flex' }} />
        </HStack>

        <HStack spacing={4}>
          <NavAuth display={{ base: 'none', md: 'flex' }} />
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onToggle}
            icon={<Menu />}
            variant="ghost"
            aria-label="Toggle navigation"
          />
        </HStack>
      </Flex>

      <MobileNav isOpen={isOpen} />
    </Box>
  );
};

export default Navbar;