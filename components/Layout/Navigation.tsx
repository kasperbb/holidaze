import * as React from 'react'

import {
  Avatar,
  Box,
  Button,
  Center,
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
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { FiLogOut, FiMenu, FiSearch, FiUser, FiUsers } from 'react-icons/fi'
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
  const { user } = useAuth()

  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [search, setSearch] = useState('')
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  const { mutate: signOut } = useSignOut()

  return (
    <Box as="nav" position="fixed" width="full" bg="white" borderBottomRadius="lg" boxShadow={useColorModeValue('sm', 'sm-dark')} zIndex={99} px={6}>
      <HStack spacing="10" justify="space-between" fontFamily="jost">
        <Box px={4} py={3}>
          <NextLink href={routes.base} passHref>
            <Link>
              <Logo />
            </Link>
          </NextLink>
        </Box>
        {isDesktop ? (
          <Flex justify="space-between" flex="1">
            <Flex>
              {NAV_ITEMS.map(({ label, href }) => (
                <NavItem key={href} href={href} label={label} />
              ))}
            </Flex>

            <HStack spacing={4} px={4} py={3}>
              <Searchbar />

              {user ? (
                <Menu>
                  <MenuButton rounded="full">
                    <Avatar size="sm" src="user_placeholder.jpg" />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <Center>
                      <Text>{user.email}</Text>
                    </Center>
                    <MenuDivider />
                    <NextLink href={user.role === 'admin' ? routes.admin.base : routes.admin.accommodations.my} passHref>
                      <MenuItem as="a" icon={user.role === 'admin' ? <FiUsers /> : <FiUser />}>
                        {user.role === 'admin' ? 'Admin' : 'My Account'}
                      </MenuItem>
                    </NextLink>
                    <MenuItem icon={<FiLogOut />} onClick={() => signOut()}>
                      Sign Out
                    </MenuItem>
                  </MenuList>
                </Menu>
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
                  {user ? (
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
