import { Box, Button, Container, Link, Stack, Text, VisuallyHidden, useColorModeValue } from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

import { FOOTER_NAV_ITEMS } from '@constants/nav'
import { Logo } from '../Logo'
import NextLink from 'next/link'
import { ReactNode } from 'react'
import { useAuth } from '@context/AuthContext'

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <Button
      variant="no-padding"
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  )
}

export function Footer() {
  const { user } = useAuth()

  const navItems = user ? FOOTER_NAV_ITEMS : FOOTER_NAV_ITEMS.filter(item => !item.protected)

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} color={useColorModeValue('gray.700', 'gray.200')}>
      <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'}>
        <Logo />
        <Stack direction={'row'} spacing={6}>
          {navItems.map(({ label, href }) => (
            <NextLink key={href} href={href} passHref>
              <Link>{label}</Link>
            </NextLink>
          ))}
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={'solid'} borderColor={useColorModeValue('gray.200', 'gray.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2022 Chakra Templates. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
