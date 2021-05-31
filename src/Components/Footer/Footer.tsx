// Hooks
import { Link } from 'react-router-dom'
import { useAuth } from '../../Hooks/useAuth'

export const Footer = () => {
  const { user, signInWithGoogle, signOut } = useAuth()

  const toggleAuth = () => (!!user ? signOut() : signInWithGoogle())
  return (
    <footer className="bg-primary" style={{ gap: '1em' }}>
      <Link to="/" onClick={() => toggleAuth()} className="upper">
        {!!user ? user.displayName : 'ingresar'}
      </Link>
    </footer>
  )
}
