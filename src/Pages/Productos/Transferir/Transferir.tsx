import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

// Styles
import './main.css'

// Interfaces
import { iProduct } from '../../../Interfaces/iDatabase'

// Hooks
import { useProducts } from '../../../Hooks/useProducts'
import { useAuth } from '../../../Hooks/useAuth-'

export const Transferir: React.FC = () => {
  const { user } = useAuth()
  const [product, setProduct] = useState<iProduct | null>(null)
  const { products } = useProducts()
  let { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!!products) {
      const selectProduct = products.filter(item => item.docID === id)[0]
      setProduct(selectProduct)
    }
  }, [id, products])

  // const updateProductDB = async () => {
  //   await updateProduct(product!.docID, { ...product })
  //   setUnsaved(false)
  // }

  return (
    <main className="product-transfer">
      <div className="product-transfer--top bg-primary border-radius-bottom box-shadow upper">
        <h3>transferir</h3>
      </div>
      <div className="product-transfer-bottom">
        <h4>
          {product?.type} {product?.brand} {product?.model}
        </h4>
        <p>
          <b>Propiedad de:</b> {user?.displayName}
        </p>

        <label htmlFor="owner">Transferir a:</label>

        <input
          type="email"
          name="owner"
          id="owner"
          placeholder="Email del destinatario"
        />

        <label htmlFor="ownerConfirmation">Confirma el email</label>
        <br />
        <input
          type="email"
          name="ownerConfirmation"
          id="ownerConfirmation"
          placeholder="Confirme email del destinatario"
        />

        <p style={{ color: 'darkred' }}>
          Verifique el email del destinatario, esta acción no puede deshacerse
        </p>

        <label htmlFor="accepted">
          Para confirmar, escriba:
          <b> aceptar</b>
        </label>
        <input
          type="text"
          name="accepted"
          id="accepted"
          placeholder="Para confirmar, escriba: aceptar"
        />
      </div>

      <footer className="bg-primary left upper">
        <Link to={`/producto/${id}`}>← Atrás</Link>
      </footer>
    </main>
  )
}
