import { appConf } from '../../appConf'
import { Link, useHistory } from 'react-router-dom'

// Styles
import './main.css'

// Components
import { ProductsList } from '../../Components/ProductsList/ProductsList'
import { useAuth } from '../../Hooks/useAuth'

export const Productos = () => {
  const { canCreate } = useAuth()
  const history = useHistory()
  return (
    <main className="productos">
      <div className="productos--top bg-primary flex-center upper box-shadow border-radius-bottom">
        <h2>Productos</h2>
      </div>

      <div className="productos--bottom">
        <button
          disabled={!canCreate}
          className="upper"
          onClick={() => history.push('/productos/nuevo')}
        >
          agregar producto
        </button>
        {!canCreate && (
          <div style={{ color: 'darkred' }}>
            <small>{appConf.user.cantCreateProductMessage}</small>
          </div>
        )}

        <h3>Mis Productos</h3>
        <ProductsList filterProducts="Todos" />
      </div>
      <footer className="bg-primary left">
        <Link to="/" className="left upper outlined">
          ← Atrás
        </Link>
      </footer>
    </main>
  )
}
