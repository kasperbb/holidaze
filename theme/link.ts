import { ComponentStyleConfig } from '@chakra-ui/react'

export const Link: ComponentStyleConfig = {
  baseStyle: {
    textDecoration: 'none',
    _hover: {
      textDecoration: 'none',
    },
  },
  variants: {
    nav: {
      px: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      height: 'full',
      fontSize: 'md',
      color: 'blue.900',
      borderRadius: 'md',
      _hover: {
        color: 'blue.600',
        textDecoration: 'none',
      },
    },
    'nav-active': {
      px: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      height: 'full',
      fontSize: 'md',
      color: 'blue.900',
      _hover: {
        color: 'blue.600',
        textDecoration: 'none',
      },
      _after: {
        content: '""',
        position: 'absolute',
        bottom: 0,
        width: 'calc(100% - 20px)',
        height: '4px',
        bgColor: 'orange.500',
        borderRadius: '10px',
      },
    },
    'admin-nav': {
      p: 4,
      pl: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      position: 'relative',
      width: 'full',
      fontSize: 'md',
      color: 'blue.900',
      _hover: {
        color: 'blue.600',
        textDecoration: 'none',
      },
    },
    'admin-nav-active': {
      p: 4,
      pl: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      position: 'relative',
      width: 'full',
      fontSize: 'md',
      color: 'blue.900',
      _hover: {
        color: 'blue.600',
        textDecoration: 'none',
      },
      _after: {
        content: '""',
        position: 'absolute',
        right: 0,
        width: '4px',
        height: 'calc(100% - 20px)',
        bgColor: 'orange.500',
        borderRadius: '10px',
      },
    },
  },
}
