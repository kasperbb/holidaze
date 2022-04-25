import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import React, { useContext, useEffect, useState } from 'react'

import { supabase } from '@lib/supabase'

interface AuthContextValues {
  user: User | null | undefined
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = React.createContext<AuthContextValues | null>(null)

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextValues
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null | undefined>(null)

  useEffect(() => {
    const authSession = supabase.auth.session()
    setUser(authSession?.user)

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('event', event)
      console.log('session', session)
      updateSupabaseCookie(event, session)
      setUser(session?.user)
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  async function updateSupabaseCookie(event: AuthChangeEvent, session: Session | null) {
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
