import { Link } from 'react-router-dom'

// Hooks
import { useAuth } from '../../Hooks/useAuth'

// Component
import { MyProducts } from '../MyProducts/MyProducts'

export const Home: React.FC = () => {
  const { user, signOut } = useAuth()
  return (
    <div>
      <h3>¡ Bienvenido {user?.displayName} !</h3>
      <MyProducts />
      <footer>
        {!!user ? (
          <button onClick={() => signOut()}>Cerrar Sesión</button>
        ) : (
          <Link to="./login">Iniciar sesión</Link>
        )}
      </footer>
    </div>
  )
}
