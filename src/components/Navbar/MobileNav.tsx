import React from 'react';
import {
  VStack,
  Button,
  Collapse,
  Divider,
  Text,
  HStack,
} from '@chakra-ui/react';
import { NavLink as RouterLink } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserFunds } from '../../hooks/useUserFunds';

interface MobileNavProps {
  isOpen: boolean;
}

const MobileNav = ({ isOpen }: MobileNavProps) => {
  const { user, signOut } = useAuth();
  const { data: funds } = useUserFunds(user?.id);

  return (
    <Collapse in={isOpen} animateOpacity>
      <VStack
        p={4}
        bg="white"
        spacing={4}
        divider={<Divider />}
        display={{ base: 'flex', md: 'none' }}
      >
        <Button
          as={RouterLink}
          to="/"
          variant="ghost"
          w="full"
          justifyContent="flex-start"
        >
          Market
        </Button>

        {user ? (
          <>
            <Button
              as={RouterLink}
              to="/portfolio"
              variant="ghost"
              w="full"
              justifyContent="flex-start"
            >
              Portfolio
            </Button>
            
            <VStack align="stretch" spacing={4} w="full">
              <HStack justify="space-between">
                <Text color="gray.600" fontWeight="medium">
                  <User size={16} className="inline mr-2" />
                  {user.user_metadata.username}
                </Text>
                <Text fontWeight="medium" color="gray.600">
                  ${Number(funds?.funds).toLocaleString()}
                </Text>
              </HStack>
              
              <Button
                leftIcon={<LogOut size={16} />}
                onClick={signOut}
                variant="ghost"
                colorScheme="red"
                w="full"
                justifyContent="flex-start"
              >
                Sign Out
              </Button>
            </VStack>
          </>
        ) : (
          <VStack align="stretch" spacing={4} w="full">
            <Button
              as={RouterLink}
              to="/login"
              variant="ghost"
              w="full"
            >
              Sign In
            </Button>
            <Button
              as={RouterLink}
              to="/register"
              colorScheme="brand"
              w="full"
            >
              Register
            </Button>
          </VStack>
        )}
      </VStack>
    </Collapse>
  );
};

export default MobileNav;