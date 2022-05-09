import { AuthChangeEvent, Session, User } from '@supabase/supabase-js'
import React, { useContext, useEffect, useState } from 'react'

import { getUser } from '@queries/auth'
import { supabase } from '@lib/supabase'
import { useQuery } from 'react-query'

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
  const { data, refetch } = useQuery(['user', user?.id], () => getUser(user?.id), {
    enabled: !!user,
  })

  useEffect(() => {
    const authSession = supabase.auth.session()
    setUser(authSession?.user)

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      updateSupabaseCookie(event, session)
      setUser(session?.user)
      refetch()
    })

    return () => {
      authListener?.unsubscribe()
    }
  }, [refetch])

  console.log('userRole', user?.role)

  useEffect(() => {
    if (data) {
      setUser(prev => {
        if (!prev) return null
        return { ...prev, role: data.role }
      })
    }
  }, [data])

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
