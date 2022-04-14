import { Box } from '@chakra-ui/react'
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
        <>
          <Navigation />
          {children}
          <Footer />
        </>
      )}
    </Box>
  )
}
