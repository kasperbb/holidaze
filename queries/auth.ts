import { Auth, Public } from '@interfaces/auth'

import { supabase } from '@lib/supabase'

export const createUser = async ({ email, password }: Auth.User) => {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    throw new Error(error.message)
  }

  const { error: insertError } = await supabase.from<Public.User>('users').insert({ id: user?.id, email: user?.email }).single()

  if (insertError) {
    throw new Error(insertError.message)
  }

  return user
}

export const signIn = async ({ email, password }: Auth.User) => {
  const { user, error } = await supabase.auth.signIn({
    email,
    password,
  })

  if (error) {
    throw new Error(error.message)
  }

  const publicUser = getUser(user?.id)

  return publicUser
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export const getUser = async (id: string | undefined) => {
  if (!id) return

  const { data, error } = await supabase.from<Public.User>('users').select().eq('id', id).single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}
