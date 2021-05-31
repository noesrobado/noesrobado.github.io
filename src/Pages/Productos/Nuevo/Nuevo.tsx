import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// Data
import { appConf } from '../../../appConf'

// Styles
import './main.css'

// Interfaces
import { useProducts } from '../../../Hooks/useProducts'
import { iProduct } from '../../../Interfaces/iDatabase'
import { useAuth } from '../../../Hooks/useAuth'

const initialFormData: Partial<iProduct> = {
  id: '',
  type: 'Bicicleta',
  brand: '',
  model: '',
  description: '',
}
export const Nuevo = () => {
  const productsTypes = appConf.product.types
  const { canCreate } = useAuth()
  const history = useHistory()
  const { products, addProduct } = useProducts()
  const [formData, setFormData] = useState(initialFormData)
  const ids = products.map(item => item.id)

  const handleFormChanges = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.currentTarget
    if (name === 'id' && ids.includes(value))
      event.currentTarget.setCustomValidity(appConf.product.errorProductIdExist)
    else event.currentTarget.setCustomValidity('')

    setFormData(state => ({
      ...state,
      [name]: value,
    }))
  }

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): boolean => {
    event.preventDefault()

    addProduct({ ...formData })
    history.push('/productos/')
    return true
  }

  return (
    <main className="productos">
      <div className="productos--top bg-primary flex-center upper box-shadow border-radius-bottom">
        <h2>Productos nuevo</h2>
      </div>

      <div className="productos--bottom">
        <form onSubmit={event => handleFormSubmit(event)}>
          <fieldset>
            <label htmlFor="type">Tipo de producto</label>
            <select
              value={formData.type}
              onChange={event => handleFormChanges(event)}
              name="type"
              id="type"
            >
              {productsTypes.sort().map(item => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <label htmlFor="brand">Marca o fabricante</label>
            <input
              value={formData.brand}
              onChange={event => handleFormChanges(event)}
              type="text"
              name="brand"
              id="brand"
              required
            />

            <label htmlFor="model">Modelo</label>
            <input
              value={formData.model}
              onChange={event => handleFormChanges(event)}
              type="text"
              name="model"
              id="model"
              required
            />

            <label htmlFor="id">Número de serie o uid</label>
            <input
              value={formData.id}
              onChange={event => handleFormChanges(event)}
              type="text"
              name="id"
              id="id"
              required
            />

            <label htmlFor="description">
              Descripción que ayude a identificar el producto o aporte
              información de interés
            </label>
            <textarea
              value={formData.description}
              onChange={handleFormChanges}
              name="description"
              id="description"
            ></textarea>
            <button type="submit" className="danger" disabled={!canCreate}>
              Registrar Producto
            </button>
            {!canCreate && (
              <div style={{ color: 'darkred' }}>
                <small>{appConf.user.cantCreateProductMessage}</small>
              </div>
            )}
          </fieldset>
        </form>
      </div>
      <footer className="bg-primary left">
        <Link to="/productos" className="left upper outlined">
          ← Atrás
        </Link>
      </footer>
    </main>
  )
}
