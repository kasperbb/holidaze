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

import { FiMenu } from 'react-icons/fi'
import { Logo } from '../Logo'
import { NAV_ITEMS } from '@constants/nav'
import NextLink from 'next/link'
import { Searchbar } from './Searchbar'
import { isActiveLink } from '@utils/nav'
import { useAuth } from '@context/AuthContext'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useSignOut } from '@hooks/auth/useSignOut'

export const Navigation = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const menuBtnRef = useRef<HTMLButtonElement>(null)
  const signOutMutation = useSignOut()

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
                  <Input placeholder="Search..." />

                  <Stack spacing={4} mt={4}>
                    {NAV_ITEMS.map(({ label, href }) => (
                      <NextLink key={href} href={href} passHref>
                        <Button as="a" variant="ghost">
                          {label}
                        </Button>
                      </NextLink>
                    ))}
                  </Stack>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" width="full" mr={3} onClick={onClose}>
                    Sign In
                  </Button>
                  <Button colorScheme="blue" width="full">
                    Register
                  </Button>
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
