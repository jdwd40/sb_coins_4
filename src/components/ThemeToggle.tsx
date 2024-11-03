import React from 'react';
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { toggleColorMode } = useColorMode();
  const SwitchIcon = useColorModeValue(Moon, Sun);

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={<SwitchIcon size={18} />}
      variant="ghost"
      onClick={toggleColorMode}
      _hover={{ transform: 'translateY(-1px)' }}
      _active={{ transform: 'translateY(0)' }}
      transition="all 0.2s"
    />
  );
};

export default ThemeToggle;