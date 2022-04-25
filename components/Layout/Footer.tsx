import { Box, Button, Container, Link, Stack, Text, VisuallyHidden } from '@chakra-ui/react'
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
      bg="blackAlpha.100"
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
        bg: 'blackAlpha.200',
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
    <Box as="footer" bg="gray.50" color="gray.700">
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

      <Box borderTopWidth={1} borderStyle={'solid'} borderColor="gray.200">
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© 2022 Holidaze. All rights reserved</Text>
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
