import { Link, useHistory } from 'react-router-dom'

// Styles
import './main.css'

// Components
import { ProductsList } from '../../Components/ProductsList/ProductsList'

export const Productos = () => {
  const history = useHistory()
  return (
    <main className="productos">
      <div className="productos--top bg-primary flex-center upper box-shadow border-radius-bottom">
        <h2>Productos</h2>
      </div>

      <div className="productos--bottom">
        <button
          className="upper"
          onClick={() => history.push('/productos/nuevo')}
        >
          agregar producto
        </button>

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
