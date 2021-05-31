import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'

// Config
import { appConf } from '../../../appConf'

// Styles
import './main.css'

// Interfaces
import { iProduct } from '../../../Interfaces/iDatabase'

// Hooks
import { useProducts } from '../../../Hooks/useProducts'
import { useAuth } from '../../../Hooks/useAuth'

export const Transferir: React.FC = () => {
  const history = useHistory()
  const [isValid, setIsValid] = useState(false)
  const [inputState, setInputState] = useState({
    owner: '',
    ownerConfirm: '',
    accept: '',
    transactionType: 'Venta',
  })
  const { user } = useAuth()
  const [product, setProduct] = useState<iProduct | null>(null)
  const { products, addTransactions } = useProducts()
  let { id } = useParams<{ id: string }>()

  useEffect(() => {
    const { owner, ownerConfirm, accept } = inputState
    if (
      accept.toLocaleLowerCase() === 'confirmar' &&
      !!owner &&
      owner === ownerConfirm
    ) {
      setIsValid(true)
    }
  }, [inputState])

  useEffect(() => {
    if (!!products) {
      const selectProduct = products.filter(item => item.docID === id)[0]
      setProduct(selectProduct)
    }
  }, [id, products])

  const handleConfirm = () => {
    addTransactions(id, inputState.transactionType, inputState.owner)
    history.push('/productos/')
  }

  return (
    <main className="product-transfer">
      <div className="product-transfer--top bg-primary border-radius-bottom box-shadow upper">
        <h3>transferir</h3>
      </div>
      <div className="product-transfer-bottom">
        <h4>
          {product?.type} {product?.brand} {product?.model}
          <br />
          Propiedad de {user?.displayName}
        </h4>

        <label htmlFor="transactionType">Tipo de transacción</label>
        <select
          name="transactionType"
          id="transactionType"
          value={inputState.transactionType}
          onChange={evt =>
            setInputState({
              ...inputState,
              [evt.target.name]: evt.target.value,
            })
          }
        >
          {appConf.transactions.types
            .filter(item => item !== 'Registro')
            .map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
        </select>

        <label htmlFor="owner">Transferir a:</label>
        <input
          required
          value={inputState.owner}
          type="email"
          name="owner"
          id="owner"
          placeholder="Email del destinatario"
          onChange={evt =>
            setInputState({
              ...inputState,
              [evt.target.name]: evt.target.value,
            })
          }
        />

        <label htmlFor="ownerConfirmation">Confirma el email</label>
        <input
          required
          value={inputState.ownerConfirm}
          type="email"
          name="ownerConfirm"
          id="ownerConfirmation"
          placeholder="Confirme email del destinatario"
          onChange={evt =>
            setInputState({
              ...inputState,
              [evt.target.name]: evt.target.value,
            })
          }
        />

        <p style={{ color: 'darkred' }}>
          Verifique el email del destinatario, esta acción no puede deshacerse
        </p>

        <label htmlFor="accepted">
          Para confirmar, escriba:
          <b> confirmar</b>
        </label>
        <input
          value={inputState.accept}
          type="text"
          name="accept"
          id="accepted"
          style={{
            textTransform: 'lowercase',
            textAlign: 'center',
            color: 'darkred',
            fontWeight: 'bold',
          }}
          onChange={evt =>
            setInputState({
              ...inputState,
              [evt.target.name]: evt.target.value,
            })
          }
        />
        {isValid && (
          <button className="danger upper" onClick={() => handleConfirm()}>
            Realizar Transferencia
          </button>
        )}
      </div>

      <footer className="bg-primary left upper">
        <Link to={`/producto/${id}`}>← Atrás</Link>
      </footer>
    </main>
  )
}
