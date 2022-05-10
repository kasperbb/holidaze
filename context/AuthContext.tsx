import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import React, { useContext, useEffect, useState } from 'react'

import { getUser } from '@queries/auth'
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

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      updateSupabaseCookie(event, session)

      if (session?.user) {
        const data = await getUser(session.user.id)
        setUser(data?.role ? { ...session.user, role: data.role } : session.user)
      } else {
        setUser(null)
      }
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
