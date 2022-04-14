import { ComponentStyleConfig } from '@chakra-ui/react'

const unsetStyles = {
  width: 'unset',
  height: 'unset',
  minWidth: 'unset',
}

export const Button: ComponentStyleConfig = {
  sizes: {
    xs: {
      py: 0,
      px: 0,
    },
    sm: {
      py: 4,
      px: 6,
    },
    md: {
      py: 3,
      px: 12,
    },
  },
  variants: {
    primary: {
      ...unsetStyles,
      borderRadius: 'full',
      fontWeight: 500,
      backgroundColor: 'blue.500',
      color: 'white',
      boxShadow: '0 2px 48px 0 rgba(0, 0, 0, 0.04)',
      _hover: {
        backgroundColor: 'blue.400',
      },
    },
    secondary: {
      ...unsetStyles,
      borderRadius: 'full',
      fontWeight: 500,
      backgroundColor: 'orange.500',
      color: 'white',
      boxShadow: '0 2px 48px 0 rgba(0, 0, 0, 0.04)',
      _hover: {
        backgroundColor: 'orange.400',
      },
    },
    white: {
      ...unsetStyles,
      borderRadius: 'full',
      fontWeight: 500,
      backgroundColor: 'white',
      color: 'blue.500',
      boxShadow: '0 2px 48px 0 rgba(0, 0, 0, 0.04)',
      _hover: {
        backgroundColor: 'gray.100',
      },
    },
    'no-padding': {
      p: 0,
    },
  },
  defaultProps: {
    variant: 'primary',
  },
}
