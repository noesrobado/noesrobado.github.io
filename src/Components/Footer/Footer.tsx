// Hooks
import { Link } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth'

export const Footer = () => {
  const { user, signInWithGoogle, signOut } = useAuth()

  const toggleAuth = () => (!!user ? signOut() : signInWithGoogle())
  return (
    <footer className="bg-primary flex-center">
      <Link to="/" onClick={() => toggleAuth()} className="upper">
        {!!user ? 'cerrar sesión' : 'ingresar'}
      </Link>
    </footer>
  )
}
