import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import React, { FC, useContext, useEffect, useState } from 'react'

import { supabase } from '@lib/supabase'

interface AuthContextValues {
  user: User | null | undefined
  invalidateUser: () => void
}

const AuthContext = React.createContext<AuthContextValues | null>(null)

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextValues
}

export const AuthProvider: FC<{ invalideUser: boolean }> = ({ children, invalideUser }) => {
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

  useEffect(() => {
    if (invalideUser) invalidateUser()
  }, [invalideUser])

  async function updateSupabaseCookie(event: AuthChangeEvent, session: Session | null) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  function invalidateUser() {
    supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        invalidateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
