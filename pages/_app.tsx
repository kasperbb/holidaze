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
import { GetServerSidePropsContext } from 'next'
import { Layout } from '@components/Layout/Layout'
import { Public } from '@interfaces/auth'
import { ReactQueryDevtools } from 'react-query/devtools'
import { getUser } from '@queries/auth'
import { hotjar } from 'react-hotjar'
import { supabase } from '@lib/supabase'
import { theme } from '@theme/theme'
import { useRouteChangeProgress } from '@hooks/useRouteChangeProgress'

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { user } = await supabase.auth.api.getUserByCookie(ctx.req)

  if (!user) {
    return { props: { user: undefined } }
  }

  const publicUser = await getUser(user.id)

  return {
    props: {
      user: publicUser,
    },
  }
}

function MyApp({ Component, pageProps, user }: AppProps & { user: Public.User | undefined }) {
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
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <AuthProvider>
              <Layout user={user}>
                <Component {...pageProps} />
              </Layout>
            </AuthProvider>
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default MyApp
