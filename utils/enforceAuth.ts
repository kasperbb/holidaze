import { GetServerSideProps } from 'next'
import { supabase } from '@lib/supabase'

export const enforceAuth: (inner?: GetServerSideProps) => GetServerSideProps = inner => {
  return async ctx => {
    const { user } = await supabase.auth.api.getUserByCookie(ctx.req)

    if (!user) {
      console.log('ctx.req.cookies', ctx.req.cookies['sb-refresh-token'])
      const { data, error } = await supabase.auth.api.refreshAccessToken(ctx.req.cookies['sb-refresh-token'])
      console.log(data, error)
      return { props: {}, redirect: { destination: '/auth/sign-in?force_logout=true', permanent: false } }
    }

    if (inner) {
      return inner(ctx)
    }

    return { props: {} }
  }
}
