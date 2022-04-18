import { Heading, Text } from './typography'

import { Button } from './button'
import { Card } from './card'
import { Container } from './container'
import { Link } from './link'
import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: 'Jost, sans-serif',
  body: 'Jost, sans-serif',
}

const borderRadius = {
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },
}

const shadows = {
  primary: 'rgba(0, 0, 0, 0.04) 0px 2px 48px 0px',
}

const colors = {
  blue: {
    '50': '#E9EDFB',
    '100': '#C2CEF4',
    '200': '#9BAEEE',
    '300': '#748FE7',
    '400': '#4D6FE0',
    '500': '#2650D9',
    '600': '#1E40AE',
    '700': '#173082',
    '800': '#0F2057',
    '900': '#08102B',
  },
  orange: {
    '50': '#FDF4E8',
    '100': '#F8E1BE',
    '200': '#F4CD95',
    '300': '#EFBA6C',
    '400': '#EBA642',
    '500': '#E69319',
    '600': '#B87514',
    '700': '#8A580F',
    '800': '#5C3B0A',
    '900': '#2E1D05',
  },
  muted: '#F2F2F2',
  text: {
    primary: '#303443',
    secondary: '#687693',
  },
  success: {
    '400': '#89CF85',
    '500': '#64BC5F',
  },
  error: {
    '400': '#B85B5B',
    '500': '#BB4040',
  },
}

const styles = {
  global: {
    'html, body': {
      backgroundColor: 'white',
      fontFamily: 'body',
    },
    '*': {
      fontFamily: 'body',
    },
  },
}

const components = {
  Container,
  Button,
  Card,
  Link,
  Heading,
  Text,
}

export const theme = extendTheme({ fonts, colors, styles, borderRadius, shadows, components })
