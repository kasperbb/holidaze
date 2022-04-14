import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import React, { FC, useContext, useEffect, useState } from 'react'

import { supabase } from '@lib/supabase'

interface AuthContextValues {
  user: User | null | undefined
}

const AuthContext = React.createContext<AuthContextValues | null>(null)

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextValues
}

export const AuthProvider: FC = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(null)

  useEffect(() => {
    const authSession = supabase.auth.session()
    setUser(authSession?.user)

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      updateSupabaseCookie(event, session)
      setUser(session?.user)
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  async function updateSupabaseCookie(event: AuthChangeEvent, session: Session | null) {
    if (!session) {
      throw new Error('wtf no session')
    }
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
