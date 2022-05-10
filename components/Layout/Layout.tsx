import { Box, Flex } from '@chakra-ui/react'

import { Footer } from './Footer'
import { Navigation } from './Navigation'
import { Public } from '@interfaces/auth'
import { Sidebar } from './Sidebar'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: React.ReactNode
  user: Public.User | undefined
}

export function Layout({ children, user }: LayoutProps) {
  const router = useRouter()

  return (
    <Box>
      {router.pathname.includes('admin') ? (
        <Sidebar user={user}>{children}</Sidebar>
      ) : (
        <Flex direction="column" minHeight="100vh">
          <Navigation />
          <Box as="main" flex="1 1 0%">
            {children}
          </Box>
          <Footer />
        </Flex>
      )}
    </Box>
  )
}
