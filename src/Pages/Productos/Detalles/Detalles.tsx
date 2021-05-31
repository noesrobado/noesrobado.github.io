import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { addDays, isAfter } from 'date-fns'

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
  const [validKey, setValidKey] = useState(false)
  const [unsaved, setUnsaved] = useState(false)
  const [product, setProduct] = useState<iProduct | null>(null)
  const { products, updateProduct } = useProducts()
  let { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (!!products) {
      const item = products.filter(item => item.docID === id)[0] || []
      if (!!item.publicKeyExpiration) {
        setValidKey(!isExpiredDate(item.publicKeyExpiration))
      }
      setProduct(item)
    }
  }, [id, products])

  const handleDescriptionChanges = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    const updated = { ...product!, [name]: value }
    setUnsaved(true)
    setProduct(updated)
  }

  const handleSaveChange = async () => {
    await updateProduct(product!.docID, { ...product })
    setUnsaved(false)
  }

  const handleChangeSate = async (state: iProductState) => {
    await updateProduct(product!.docID, { state })
    setProduct({ ...product!, state })
  }

  const createShareKey = async () => {
    const today = new Date()
    const expiration = addDays(today, 2)
    const data: Partial<iProduct> = {
      publicKey: Date.now(),
      publicKeyExpiration: expiration,
    }
    await updateProduct(product!.docID, { ...data })
    setProduct({ ...product!, ...data })
  }

  const isExpiredDate = (date: Date): boolean => isAfter(new Date(), date)

  return (
    <main className="product-details">
      <div className="product-details--top bg-primary border-radius-bottom box-shadow">
        <h3>
          {product?.type} {product?.brand} {product?.model}
        </h3>
      </div>
      <div className="product-details-bottom">
        <div>
          <p className={`${product?.state === 'Denunciado' && 'danger'}`}>
            <b>Estado: </b>
            {product?.state}
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
            <b>N° de Serie: </b>
            {product?.id}
          </p>
          {validKey ? (
            <p>
              <b>Llave pública:</b>

              <div
                style={{ display: 'flex', justifyContent: 'center', gap: 16 }}
              >
                <span
                  className="success btn"
                  title="Compartir con otra persona, ésta podrá ver información de este producto."
                >
                  {product?.publicKey}
                </span>
                <span
                  className="material-icons md-18 btn danger"
                  onClick={() => createShareKey()}
                >
                  refresh
                </span>
              </div>
            </p>
          ) : (
            <p>
              <button onClick={() => createShareKey()}>
                Generar llave pública
              </button>
            </p>
          )}
        </div>
        <div>
          {!!product?.transactions &&
            product.transactions.map((item, index) => (
              <p key={index} title={`Fecha: ${item.date.toLocaleString()}`}>
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
            name="description"
            id="description"
            value={product?.description}
            rows={10}
          ></textarea>
          {unsaved && (
            <button
              onClick={() => handleSaveChange()}
              className="icon successful"
            >
              Guardar Cambios
              <span className="material-icons-outlined">save_alt</span>
            </button>
          )}
        </div>
        {!unsaved && (
          <>
            <div className="flex-center">
              {product?.state === 'Normal' && (
                <>
                  <button
                    className="icon successful"
                    onClick={() => history.push(`/productos/transferir/${id}`)}
                    title="Transfiera la propiedad de este producto a otra persona"
                  >
                    Transferir a otra persona
                    <span className="material-icons-outlined">
                      person_add_alt
                    </span>
                  </button>
                  <button
                    className="danger icon"
                    title="Denunciar robo o extravío de este productos"
                    onClick={() => handleChangeSate('Denunciado')}
                  >
                    Marcar como Denunciado{' '}
                    <span className="material-icons-outlined">
                      error_outline
                    </span>
                  </button>
                </>
              )}

              <button
                onClick={() => {
                  product?.state === 'Normal'
                    ? handleChangeSate('Desechado')
                    : handleChangeSate('Normal')
                }}
                className="icon"
              >
                {product?.state === 'Normal'
                  ? 'Marcar como desechado'
                  : 'Volver a estado normal'}
                <span className="material-icons-outlined">
                  {product?.state === 'Normal' ? 'delete_outline' : 'recycling'}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
      <footer className="bg-primary left upper">
        <Link to="/productos">← Atrás</Link>
      </footer>
    </main>
  )
}
