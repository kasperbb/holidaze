import { Auth } from '@interfaces/auth'
import { supabase } from '@lib/supabase'

export const createUser = async ({ email, password }: Auth.User) => {
  const { user, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  })

  if (error) {
    throw new Error(error.message)
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

  return user
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}

export const getUser = async () => {
  const user = await supabase.auth.user()

  return user
}
