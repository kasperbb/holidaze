import '@fontsource/jost/variable.css'
import '@fontsource/work-sans/variable.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'swiper/css'
import 'maplibre-gl/dist/maplibre-gl.css'
import '@theme/globals.css'

import { ChakraProvider, useToast } from '@chakra-ui/react'
import { Hydrate, QueryCache, QueryClient, QueryClientProvider } from 'react-query'

import type { AppProps } from 'next/app'
import { AuthProvider } from '@context/AuthContext'
import { Layout } from '@components/Layout/Layout'
import { ReactQueryDevtools } from 'react-query/devtools'
import { routes } from '@constants/routes'
import { supabase } from '@lib/supabase'
import { theme } from '@theme/theme'
import { useRouteChangeProgress } from '@hooks/useRouteChangeProgress'
import { useRouter } from 'next/router'
import { useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useRouteChangeProgress()

  const router = useRouter()
  const toast = useToast()

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
        // mutationCache: new MutationCache({
        //   onError: error => handleError(error as Error),
        // }),
      })
  )

  async function handleError(error: Error) {
    if (error.message.includes('JWT expired')) {
      await supabase.auth.signOut()
      router.push(routes.auth.signIn)
      toast({
        title: 'Error!',
        description: 'Session ran out, please sign in again.',
        status: 'error',
        isClosable: true,
      })
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
