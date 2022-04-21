import { Box, Flex } from '@chakra-ui/react'

import { FC } from 'react'
import { Footer } from './Footer'
import { Navigation } from './Navigation'
import { Sidebar } from './Sidebar'
import { useRouter } from 'next/router'

export const Layout: FC = ({ children }) => {
  const router = useRouter()

  return (
    <Box>
      {router.pathname.includes('admin') ? (
        <Sidebar>{children}</Sidebar>
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
