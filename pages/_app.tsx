import '@fontsource/jost/variable.css'
import '@fontsource/work-sans/variable.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'swiper/css'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@theme/globals.css'

import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import { AuthProvider } from '@context/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import ErrorBoundary from '@components/ErrorBoundary'
import { Layout } from '@components/Layout/Layout'
import { Public } from '@interfaces/auth'
import { ReactQueryDevtools } from 'react-query/devtools'
import { hotjar } from 'react-hotjar'
import { theme } from '@theme/theme'
import { useRouteChangeProgress } from '@hooks/useRouteChangeProgress'

function MyApp({ Component, pageProps }: AppProps & { user: Public.User | undefined }) {
  useRouteChangeProgress()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,
            staleTime: 1000 * 30,
          },
        },
      })
  )

  useEffect(() => {
    hotjar.initialize(Number(process.env.NEXT_PUBLIC_HOTJAR_ID), 6)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <ErrorBoundary>
            <AuthProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </AuthProvider>
          </ErrorBoundary>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default MyApp
