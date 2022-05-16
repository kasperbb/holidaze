import { AuthChangeEvent, Session } from '@supabase/supabase-js'
import React, { useContext, useEffect, useState } from 'react'

import { Public } from '@interfaces/auth'
import { getUser } from '@queries/auth'
import { supabase } from '@lib/supabase'

interface AuthContextValues {
  user: Public.User | null | undefined
}

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthContext = React.createContext<AuthContextValues | null>(null)

export const useAuth = () => {
  return useContext(AuthContext) as AuthContextValues
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Public.User | null | undefined>(null)

  useEffect(() => {
    setUserSession(supabase.auth.session())

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      updateSupabaseCookie(event, session)
      setUserSession(session)
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [])

  async function setUserSession(session: Session | null) {
    if (session?.user) {
      const data = await getUser(session.user.id)
      setUser(data)
    } else {
      setUser(null)
    }
  }

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
