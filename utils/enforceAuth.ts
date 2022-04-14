import { GetServerSideProps } from 'next'
import { supabase } from '@lib/supabase'

export const enforceAuth: (inner?: GetServerSideProps) => GetServerSideProps = inner => {
  return async ctx => {
    const { user } = await supabase.auth.api.getUserByCookie(ctx.req)

    if (!user) {
      return { props: {}, redirect: { destination: '/auth/sign-in' } }
    }

    if (inner) {
      return inner(ctx)
    }

    return { props: {} }
  }
}
