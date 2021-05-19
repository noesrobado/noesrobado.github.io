import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithRedirect,
  signOut as singOutFromProvider,
  User,
} from 'firebase/auth'
import { useState } from 'react'

const auth = getAuth()
auth.languageCode = 'es'

const provider = new GoogleAuthProvider()

export const useAuth = () => {
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

  return { user, signInWithGoogle, signOut }
}
