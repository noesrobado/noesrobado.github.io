import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { iProduct } from '../../Interfaces/iDatabase'
import { getProductByKey } from '../../Services/firebase'

// Styles
import './main.css'

export const Consultas: React.FC = () => {
  const [product, setProduct] = useState<iProduct | null | undefined>(undefined)
  let { key } = useParams<{ key: string }>()

  const getProductData = async (key: number) => {
    if (!key) return
    const product = await getProductByKey(+key)
    setProduct(product)
  }

  useEffect(() => {
    getProductData(+key)
  }, [key])

  return (
    <main className="product-consultas">
      <div className="product-consultas--top bg-primary border-radius-bottom box-shadow upper">
        <h3>Consultas</h3>
      </div>
      <div className="product-consultas-bottom">
        {product === undefined && <h3>cargando...</h3>}
        {product === null && (
          <div>
            <h3>¡La llave publica ha caducado!</h3>
            <p>Solicite al propietario del producto una nueva llave púbica.</p>
          </div>
        )}

        {product && (
          <div>
            <h3>
              {product?.type} {product?.brand} {product?.model}
            </h3>
            <p>Número de serie: {product.id}</p>
            <p>Denunciado: {product.state === 'Denunciado' ? 'SI' : 'NO'}</p>
            <p>
              El producto ha sido registrado el{' '}
              {product.dates.created.toLocaleDateString()}.
            </p>
            <br />
            <small>
              {`Este código vence el ${product.publicKeyExpiration?.toLocaleDateString()}, luego de esa
              fecha no podrá consultar esta información.`}
            </small>
          </div>
        )}
      </div>

      <footer className="bg-primary left upper">
        <Link to={`/`}>← Home</Link>
      </footer>
    </main>
  )
}
