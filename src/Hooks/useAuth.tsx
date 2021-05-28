import React, { createContext, useContext } from 'react'
import { useState } from 'react'
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as singOutFromProvider,
  User,
} from 'firebase/auth'

const auth = getAuth()
auth.languageCode = 'es'
const provider = new GoogleAuthProvider()

interface iCtx {
  user: User | null
  signInWithGoogle: Function
  signOut: Function
}
const ctx: iCtx = {
  user: null,
  signInWithGoogle() {},
  signOut() {},
}

const Context = createContext(ctx)

export const useAuth = () => useContext(Context)

export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const signInWithGoogle = async () => {
    const response = await signInWithRedirect(auth, provider)
    setUser(response)
    console.log(response)
  }

  const signOut = () => {
    singOutFromProvider(auth)
      .then(() => console.log('User logout !'))
      .catch(error => console.error(error))
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
      console.log('User Logout!')
    }
  })

  return (
    <Context.Provider value={{ user, signInWithGoogle, signOut }}>
      {children}
    </Context.Provider>
  )
}
