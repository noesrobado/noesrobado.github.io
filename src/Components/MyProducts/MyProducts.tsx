import { useState } from 'react'

// Interfaces
interface iProduct {
  type:
    | 'Teléfono'
    | 'Bicicleta'
    | 'Cámara de Fotos'
    | 'Objetivo'
    | 'Motocicleta'
    | 'Computadora'
    | 'Otro'
  serial: string | null
  description: string
  buyDate: Date
  brand?: string
  model?: string
}

const initialProducts: iProduct[] = [
  {
    type: 'Cámara de Fotos',
    buyDate: new Date(),
    description: 'Cámara sin objetivo, no funciona el flash integrado',
    serial: '2068316',
    brand: 'Nikon',
    model: 'D3200',
  },
  {
    type: 'Computadora',
    buyDate: new Date(),
    description: 'Notebook Dell i3',
    serial: 'RRhh2068316',
    brand: 'Dell',
  },
  {
    type: 'Teléfono',
    buyDate: new Date(),
    description: 'Color negro',
    serial: '206833899816',
    brand: 'Xiaomi',
    model: 'Mi 9T',
  },
]

export const MyProducts: React.FC = () => {
  const [products] = useState(initialProducts)
  return (
    <div>
      <p>Mis Productos</p>
      {!!products.length && (
        <ul>
          {products.map((item, index) => (
            <li
              key={index}
              title={`Propietario desde ${item.buyDate.toLocaleDateString()}`}
            >
              {item.type} {item.brand} {item.model}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
