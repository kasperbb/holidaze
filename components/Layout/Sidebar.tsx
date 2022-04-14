import { Box, BoxProps, CloseButton, Drawer, DrawerContent, Flex, FlexProps, Icon, IconButton, Link, LinkProps, Text, useDisclosure } from '@chakra-ui/react'
import React, { ReactNode } from 'react'

import { ADMIN_NAV_ITEMS } from '@constants/nav'
import { FiMenu } from 'react-icons/fi'
import { IconType } from 'react-icons'
import NextLink from 'next/link'
import { isActiveLink } from '@utils/nav'
import { useRouter } from 'next/router'

export function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh">
      <SidebarContent isOpen={isOpen} onClose={() => onClose} display={{ base: 'none', md: 'block' }} />

      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent isOpen={isOpen} onClose={onClose} />
        </DrawerContent>
      </Drawer>

      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />

      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

interface SidebarProps extends BoxProps {
  onClose: () => void
  isOpen: boolean
}

const SidebarContent = ({ isOpen, onClose, ...rest }: SidebarProps) => {
  return (
    <Box borderEndRadius="lg" boxShadow="rgba(0, 0, 0, 0.04) 0px 2px 48px 0px" w={{ base: 'full', md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent={isOpen ? 'space-between' : 'center'}>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {ADMIN_NAV_ITEMS.map(item => (
        <NavItem key={item.name} href={item.href} icon={item.icon}>
          {item.name}
        </NavItem>
      ))}
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
        Logo
      </Text>
    </Flex>
  )
}
