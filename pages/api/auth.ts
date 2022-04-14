import { NextApiRequest, NextApiResponse } from 'next'

import { GoTrueClient } from '@supabase/supabase-js'

const authClient = new GoTrueClient({
  url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1`,
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
    apikey: `${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
  },
  cookieOptions: {
    name: 'sb:token',
    lifetime: 60 * 60 * 8,
    domain: '',
    path: '/',
    sameSite: 'lax',
  },
})

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  authClient.api.setAuthCookie(req, res)
}
