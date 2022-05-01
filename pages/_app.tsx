import '@fontsource/jost/variable.css'
import '@fontsource/work-sans/variable.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'swiper/css'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@theme/globals.css'

import { Hydrate, QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { useEffect, useState } from 'react'

import type { AppProps } from 'next/app'
import { AuthProvider } from '@context/AuthContext'
import { ChakraProvider } from '@chakra-ui/react'
import { Layout } from '@components/Layout/Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import { hotjar } from 'react-hotjar'
import { supabase } from '@lib/supabase'
import { theme } from '@theme/theme'
import { useRouteChangeProgress } from '@hooks/useRouteChangeProgress'

function MyApp({ Component, pageProps }: AppProps) {
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
        queryCache: new QueryCache({
          onError: error => handleError(error as Error),
        }),
      })
  )

  useEffect(() => {
    console.log('hotjar', process.env.NEXT_PUBLIC_HOTJAR_ID)
    hotjar.initialize(Number(process.env.NEXT_PUBLIC_HOTJAR_ID), 6)
  }, [])

  async function handleError(error: Error) {
    if (error.message.includes('JWT expired')) {
      // await supabase.auth.signOut()
      console.log('REFRESHED')
      supabase.auth.refreshSession()
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <AuthProvider>
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
