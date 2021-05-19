import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

// Hooks
import { useAuth } from '../../Hooks/useAuth'

export const Login: React.FC = () => {
  const history = useHistory()
  const { user, signInWithGoogle, signOut } = useAuth()

  useEffect(() => {
    if (user) history.push('/')
  }, [user])

  const handleLogin = () => {
    signInWithGoogle()
  }
  const handleLogout = () => {
    signOut()
  }
  return (
    <div>
      {!user?.uid && (
        <div>
          <button onClick={() => handleLogin()}>Iniciar sesión</button>
          <p>Debe iniciar sesión para continuar</p>
        </div>
      )}
      {!!user?.uid && (
        <div>
          <button onClick={() => handleLogout()}>Cerrar sesión</button>
        </div>
      )}
      {user?.displayName}
    </div>
  )
}
