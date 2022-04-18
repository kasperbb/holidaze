import { ComponentStyleConfig } from '@chakra-ui/react'

const sharedStyles = {
  width: 'unset',
  height: 'unset',
  minWidth: 'unset',
  borderRadius: 'full',
  fontWeight: 500,
  fontFamily: 'body',
  boxShadow: '0 2px 48px 0 rgba(0, 0, 0, 0.04)',
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
      ...sharedStyles,
      backgroundColor: 'blue.500',
      color: 'white',
      _hover: {
        backgroundColor: 'blue.400',
      },
    },
    secondary: {
      ...sharedStyles,
      backgroundColor: 'orange.500',
      color: 'white',
      _hover: {
        backgroundColor: 'orange.400',
      },
    },
    success: {
      ...sharedStyles,
      backgroundColor: 'success.500',
      color: 'white',
      _hover: {
        backgroundColor: 'success.400',
      },
    },
    error: {
      ...sharedStyles,
      backgroundColor: 'error.500',
      color: 'white',
      _hover: {
        backgroundColor: 'error.400',
      },
    },
    white: {
      ...sharedStyles,
      borderRadius: 'full',
      backgroundColor: 'white',
      color: 'blue.500',
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
