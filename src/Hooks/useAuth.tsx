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
// auth.languageCode = 'es'
const provider = new GoogleAuthProvider()

interface iCtx {
  user: User | null
  signInWithGoogle: Function
  signOut: Function
  canCreate: boolean
  setCanCreate: React.Dispatch<React.SetStateAction<boolean>>
}
const ctx: iCtx = {
  user: null,
  signInWithGoogle() {},
  signOut() {},
  canCreate: false,
  setCanCreate() {},
}

const Context = createContext(ctx)

export const useAuth = () => useContext(Context)

export const AuthProviders = ({ children }: { children: React.ReactNode }) => {
  const [canCreate, setCanCreate] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const signInWithGoogle = async () => {
    const response = await signInWithRedirect(auth, provider)
    setUser(response)
  }

  const signOut = () => {
    singOutFromProvider(auth).catch(error => console.error(error))
  }

  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  })

  return (
    <Context.Provider
      value={{ user, signInWithGoogle, signOut, canCreate, setCanCreate }}
    >
      {children}
    </Context.Provider>
  )
}
