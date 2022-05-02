import * as React from 'react'

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  Link,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FiMenu, FiSearch } from 'react-icons/fi'
import { useRef, useState } from 'react'

import { Logo } from '../Logo'
import { NAV_ITEMS } from '@constants/nav'
import NextLink from 'next/link'
import { Searchbar } from './Searchbar'
import { isActiveLink } from '@utils/nav'
import { routes } from '@constants/routes'
import { useAuth } from '@context/AuthContext'
import { useRouter } from 'next/router'
import { useSignOut } from '@hooks/auth/useSignOut'

export const Navigation = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const signOutMutation = useSignOut()
  const [search, setSearch] = useState('')

  const auth = useAuth()

  return (
    <Box as="nav" position="fixed" width="full" bg="white" borderBottomRadius="lg" boxShadow={useColorModeValue('sm', 'sm-dark')} zIndex={99}>
      <HStack spacing="10" justify="space-between" fontFamily="jost">
        <Box px={4} py={3}>
          <Logo />
        </Box>
        {isDesktop ? (
          <Flex justify="space-between" flex="1">
            <Flex>
              {NAV_ITEMS.map(({ label, href }) => (
                <NavItem key={href} href={href} label={label} />
              ))}
            </Flex>

            <HStack px={4} py={3}>
              <Searchbar />

              {auth.user ? (
                <Button variant="primary" onClick={() => signOutMutation.mutate()}>
                  Sign Out
                </Button>
              ) : (
                <NextLink href="/auth/sign-in" passHref>
                  <Button as="a" variant="primary">
                    Sign In
                  </Button>
                </NextLink>
              )}
            </HStack>
          </Flex>
        ) : (
          <>
            <IconButton onClick={onOpen} variant="ghost" icon={<FiMenu fontSize="1.25rem" />} aria-label="Open Menu" />
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={menuBtnRef}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Search</DrawerHeader>

                <DrawerBody>
                  <HStack>
                    <Input name="search" placeholder="Search..." onChange={e => setSearch(e.target.value)} />
                    <NextLink href={`${routes.accommodations.base}?search=${search}`} passHref>
                      <IconButton as="a" icon={<FiSearch />} size="lg" aria-label="Search" p={2} onClick={onClose} />
                    </NextLink>
                  </HStack>

                  <Stack spacing={4} mt={4}>
                    {NAV_ITEMS.map(({ label, href }) => (
                      <NextLink key={href} href={href} passHref>
                        <Button as="a" variant="ghost" onClick={onClose}>
                          {label}
                        </Button>
                      </NextLink>
                    ))}
                  </Stack>
                </DrawerBody>

                <DrawerFooter>
                  {auth.user ? (
                    <Button variant="primary" width="full" onClick={() => signOutMutation.mutate()}>
                      Sign Out
                    </Button>
                  ) : (
                    <NextLink href="/auth/sign-in" passHref>
                      <Button as="a" width="full" variant="primary" onClick={onClose}>
                        Sign In
                      </Button>
                    </NextLink>
                  )}
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </>
        )}
      </HStack>
    </Box>
  )
}

interface NavItem {
  href: string
  label: string
}

export const NavItem = ({ href, label }: NavItem) => {
  const { pathname } = useRouter()
  return (
    <NextLink key={href} href={href} passHref>
      <Link as="a" variant={isActiveLink(href, pathname) ? 'nav-active' : 'nav'}>
        {label}
      </Link>
    </NextLink>
  )
}
