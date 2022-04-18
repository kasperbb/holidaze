import '@fontsource/jost/variable.css'
import '@fontsource/work-sans/variable.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'swiper/css'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@theme/globals.css'

import { Hydrate, QueryCache, QueryClient, QueryClientProvider } from 'react-query'

import type { AppProps } from 'next/app'
import { AuthProvider } from '@context/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '@components/Layout/Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import { theme } from '@theme/theme'
import { useRouteChangeProgress } from '@hooks/useRouteChangeProgress'
import { useState } from 'react'

// import '@fontsource/work-sans/variable.css'

function MyApp({ Component, pageProps }: AppProps) {
  useRouteChangeProgress()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
        queryCache: new QueryCache({
          onError: error => handleError(error as Error),
        }),
      })
  )

  const [invalideUser, setInvaliateUser] = useState(false)

  function handleError(error: Error) {
    if (error.message === 'JWT expired') {
      setInvaliateUser(true)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <AuthProvider invalideUser={invalideUser}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
