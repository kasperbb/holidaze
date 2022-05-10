import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'

import { ParsedUrlQuery } from 'querystring'
import { Public } from '@interfaces/auth'
import { getUser } from '@queries/auth'
import { supabase } from '@lib/supabase'

type EnforceAuth<P extends { [key: string]: any } = { [key: string]: any }, Q extends ParsedUrlQuery = ParsedUrlQuery, D extends PreviewData = PreviewData> = (
  context: GetServerSidePropsContext<Q, D> & { user: Public.User | undefined }
) => Promise<GetServerSidePropsResult<P>>

export const enforceAuth: (inner?: EnforceAuth) => GetServerSideProps = inner => {
  return async ctx => {
    const { user } = await supabase.auth.api.getUserByCookie(ctx.req)

    if (!user) {
      await supabase.auth.api.refreshAccessToken(ctx.req.cookies['sb-refresh-token'])
      return { props: {}, redirect: { destination: '/auth/sign-in?force_logout=true', permanent: false } }
    }

    if (inner) {
      const publicUser = await getUser(user.id)
      return inner({ ...ctx, user: publicUser })
    }

    return { props: {} }
  }
}

export const enforceAdmin: (inner?: GetServerSideProps) => GetServerSideProps = inner => {
  return async ctx => {
    const { user } = await supabase.auth.api.getUserByCookie(ctx.req)

    if (!user) {
      await supabase.auth.api.refreshAccessToken(ctx.req.cookies['sb-refresh-token'])
      return { props: {}, redirect: { destination: '/auth/sign-in?force_logout=true', permanent: false } }
    }

    const publicUser = await getUser(user.id)

    if (publicUser?.role !== 'admin') {
      return { props: {}, redirect: { destination: '/admin/error', permanent: false } }
    }

    if (inner) {
      return inner(ctx)
    }

    return { props: {} }
  }
}
