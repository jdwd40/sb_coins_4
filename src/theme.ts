import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: 'Inter, system-ui, sans-serif',
    body: 'Inter, system-ui, sans-serif',
  },
  colors: {
    brand: {
      50: '#E5F4FF',
      100: '#B8E1FF',
      200: '#8ACDFF',
      300: '#5CB9FF',
      400: '#2EA5FF',
      500: '#0091FF',
      600: '#0074CC',
      700: '#005799',
      800: '#003A66',
      900: '#001D33',
    },
    dark: {
      bg: '#111827',
      card: '#1F2937',
      border: '#374151',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
          color: 'white',
          _hover: {
            bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
            transform: 'translateY(-1px)',
            shadow: 'md',
          },
          _active: {
            transform: 'translateY(0)',
            shadow: 'sm',
          },
          transition: 'all 0.2s',
        }),
        ghost: {
          _hover: {
            transform: 'translateY(-1px)',
          },
          _active: {
            transform: 'translateY(0)',
          },
          transition: 'all 0.2s',
        },
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'dark.card' : 'white',
          borderRadius: 'xl',
          borderWidth: '1px',
          borderColor: props.colorMode === 'dark' ? 'dark.border' : 'gray.200',
          shadow: 'sm',
          transition: 'all 0.2s',
          _hover: {
            shadow: 'md',
            transform: 'translateY(-2px)',
          },
        },
      }),
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'dark.bg' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.900',
      },
      '*::selection': {
        bg: 'brand.500',
        color: 'white',
      },
    }),
  },
  layerStyles: {
    card: {
      bg: 'white',
      _dark: {
        bg: 'dark.card',
      },
      rounded: 'xl',
      shadow: 'sm',
      borderWidth: '1px',
      borderColor: 'gray.200',
      _dark: {
        borderColor: 'dark.border',
      },
      transition: 'all 0.2s',
      _hover: {
        shadow: 'md',
        transform: 'translateY(-2px)',
      },
    },
  },
});

export default theme;