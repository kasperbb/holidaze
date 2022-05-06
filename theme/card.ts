import { ComponentStyleConfig } from '@chakra-ui/react'

export const Card: ComponentStyleConfig = {
  parts: ['card', 'content', 'image'],
  baseStyle: {
    card: {
      display: 'flex',
      flexDirection: 'column',
      background: 'white',
      width: 'full',
      borderRadius: '2xl',
      boxShadow: 'rgba(0, 0, 0, 0.04) 0px 2px 48px 0px',
      overflow: 'hidden',
    },
    image: {
      width: 'full',
      height: '250px',
      objectFit: 'cover',
      borderRadiusBottom: '5px',
    },
    content: {
      p: '1.5rem',
    },
  },
  sizes: {
    sm: {
      title: {
        fontSize: 18,
      },
      content: {
        p: '1rem',
      },
    },
    md: {
      title: {
        fontSize: 24,
      },
      content: {
        p: '1.5rem',
      },
    },
  },
  variants: {
    horizontal: {
      card: {
        display: 'flex',
        flexDirection: ['column', 'row'],
        background: 'white',
        maxWidth: 'full',
        borderRadius: '2xl',
        boxShadow: 'rgba(0, 0, 0, 0.04) 0px 2px 48px 0px',
        overflow: 'hidden',
      },
      image: {
        minWidth: '200px',
        maxHeight: ['150px', '125px'],
        width: 'unset',
        height: 'full',
        objectFit: 'cover',
        borderRadiusBottom: '5px',
      },
      content: {
        p: '1.5rem',
      },
    },
    'no-padding': {
      content: {
        p: 0,
      },
    },
  },
  defaultProps: {
    size: 'md',
  },
}
