import { ADMIN_NAV_ITEMS, AdminNavItem } from '@constants/nav'
import { Box, BoxProps, CloseButton, Drawer, DrawerContent, Flex, FlexProps, Icon, IconButton, Link, LinkProps, Text, useDisclosure } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { FiMenu } from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Logo } from '@components/Logo'
import NextLink from 'next/link'
import { Public } from '@interfaces/auth'
import { isActiveLink } from '@utils/nav'
import { useRouter } from 'next/router'

interface SidebarProps {
  children: ReactNode
  user: Public.User | undefined
}

export function Sidebar({ children, user }: SidebarProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh">
      <SidebarContent user={user} isOpen={isOpen} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />

      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent user={user} isOpen={isOpen} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarContentProps extends BoxProps {
  onClose: () => void
  isOpen: boolean
  user: Public.User | undefined
}

const SidebarContent = ({ user, isOpen, onClose, ...rest }: SidebarContentProps) => {
  const isAdmin = user?.role === 'admin'

  function renderNavItem(item: AdminNavItem) {
    if (isAdmin) {
      return (
        <NavItem key={item.name} href={item.href} icon={item.icon} onClick={onClose}>
          {item.name}
        </NavItem>
      )
    }

    if (item.protected) {
      return (
        item.fallback && (
          <NavItem key={item.fallback.name} href={item.fallback.href} icon={item.fallback.icon} onClick={onClose}>
            {item.fallback.name}
          </NavItem>
        )
      )
    }

    return (
      <NavItem key={item.name} href={item.href} icon={item.icon} onClick={onClose}>
        {item.name}
      </NavItem>
    )
  }

  return (
    <Box borderEndRadius="lg" boxShadow="rgba(0, 0, 0, 0.04) 0px 2px 48px 0px" w={{ base: 'full', md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent={isOpen ? 'space-between' : 'center'}>
        <Logo />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {ADMIN_NAV_ITEMS.map(item => renderNavItem(item))}
    </Box>
  )
}

interface NavItemProps extends LinkProps {
  icon: IconType
  children: React.ReactNode
  href: string
}
function NavItem({ icon, children, href, ...rest }: NavItemProps) {
  const { pathname } = useRouter()

  return (
    <NextLink href={href} passHref>
      <Link variant={isActiveLink(href, pathname) ? 'admin-nav-active' : 'admin-nav'} {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Link>
    </NextLink>
  )
}

interface MobileProps extends FlexProps {
  onOpen: () => void
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        <Logo />
      </Text>
    </Flex>
  )
}
