import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

// Styles
import './main.css'

// Interfaces
import { iProduct, iProductState } from '../../../Interfaces/iDatabase'

// Hooks
import { useProducts } from '../../../Hooks/useProducts'
import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'

export const Detalles: React.FC = () => {
  const history = useHistory()
  const [unsaved, setUnsaved] = useState(false)
  const [product, setProduct] = useState<iProduct | null>(null)
  const { products, updateProduct } = useProducts()
  let { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!!products) {
      const selectProduct = products.filter(item => item.docID === id)[0] || []
      setProduct(selectProduct)
    }
  }, [id, products])

  const handleDescriptionChanges = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    const newItem = { ...product!, [name]: value }
    setProduct(newItem)
    setUnsaved(true)
  }

  const updateProductDB = async () => {
    await updateProduct(product!.docID, { ...product })
    setUnsaved(false)
  }

  const handleChangeSate = async (state: iProductState) => {
    await updateProduct(product!.docID, { state })
    setProduct({ ...product!, state })
  }

  return (
    <main className="product-details">
      <div className="product-details--top bg-primary border-radius-bottom box-shadow">
        <h3>
          {product?.type} {product?.brand} {product?.model}
        </h3>
      </div>
      <div className="product-details-bottom">
        <div>
          <p>
            <b>N° de Serie: </b>
            {product?.id}
          </p>
          <p>
            <b>Tipo: </b>
            {product?.type}
          </p>
          <p>
            <b>Marca: </b>
            {product?.brand}
          </p>
          <p>
            <b>Modelo: </b>
            {product?.model}
          </p>
          <p>
            <b>Estado: </b>
            {product?.state}
          </p>
        </div>
        <div>
          {!!product?.transactions &&
            product.transactions.map((item, index) => (
              <p key={index}>
                {`
                ${item.type}: 
                ${formatDistance(new Date(item.date), new Date(), {
                  addSuffix: true,
                  locale: es,
                })}
                `}
                <br />
                <small>
                  {item.to ? ` ${item.from} → ${item.to}` : ` ${item.from}`}
                </small>
              </p>
            ))}
        </div>
        <div className="flex-center">
          <label htmlFor="description">Descripción:</label>
          <textarea
            onChange={evt => handleDescriptionChanges(evt)}
            // onKeyUp={evt => console.log(evt)}
            name="description"
            id="description"
            value={product?.description}
            rows={10}
          ></textarea>
          {unsaved && (
            <button
              onClick={() => updateProductDB()}
              className="icon successful"
            >
              Guardar Cambios
              <span className="material-icons-outlined">save_alt</span>
            </button>
          )}
        </div>
        <div className="flex-center">
          <button
            className="icon"
            onClick={() => history.push(`/productos/transferir/${id}`)}
          >
            Transferir a otra persona
            <span className="material-icons-outlined">person_add_alt</span>
          </button>
          <button
            onClick={() => {
              product?.state === 'Normal'
                ? handleChangeSate('Desechado')
                : handleChangeSate('Normal')
            }}
            className="icon"
          >
            Marcar como {product?.state === 'Normal' ? 'Desechado' : 'Normal'}
            <span className="material-icons-outlined">
              {product?.state === 'Normal' ? 'delete' : 'restore_from_trash'}
            </span>
          </button>
          <button className="danger icon">
            Marcar como Denunciado{' '}
            <span className="material-icons-outlined">error_outline</span>
          </button>
        </div>
      </div>
      <footer className="bg-primary left upper">
        <Link to="/productos">← Atrás</Link>
      </footer>
    </main>
  )
}
