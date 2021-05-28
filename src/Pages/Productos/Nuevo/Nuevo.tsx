import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

// Styles
import './main.css'

// Interfaces
import { iRegisterProduct, useProducts } from '../../../Hooks/useProducts'

const initialFormData: iRegisterProduct = {
  id: '',
  type: 'Bicicleta',
  brand: '',
  model: '',
  description: '',
}
export const Nuevo = () => {
  const history = useHistory()
  const { addProduct } = useProducts()
  const [formData, setFormData] = useState(initialFormData)

  const handleFormChanges = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.currentTarget
    setFormData(state => ({
      ...state,
      [name]: value,
    }))
  }

  const handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ): boolean => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity()) return false
    addProduct({ ...formData })
    history.push('/productos')
    return true
  }

  return (
    <main className="productos">
      <div className="productos--top bg-primary flex-center upper box-shadow border-radius-bottom">
        <h2>Productos nuevo</h2>
      </div>

      <div className="productos--bottom">
        <form
          // onChange={event => handleFormChanges(event)}
          onSubmit={event => handleFormSubmit(event)}
        >
          <fieldset>
            <label htmlFor="type">Tipo de producto</label>
            <select
              value={formData.type}
              onChange={event => handleFormChanges(event)}
              name="type"
              id="type"
            >
              <option value="Teléfono Movil">Teléfono Movil</option>
              <option value="Notebook">Notebook</option>
              <option value="Cámara de Fotos">Cámara de Fotos</option>
              <option value="Bicicleta">Bicicleta</option>
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
              Descripción que ayuda a identificar el producto
            </label>
            <textarea
              value={formData.description}
              onChange={handleFormChanges}
              name="description"
              id="description"
            ></textarea>
            <button type="submit" className="danger">
              Registrar Producto
            </button>
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
