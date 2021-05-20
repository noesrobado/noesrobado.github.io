import { useEffect, useState } from 'react'

// Instances
import { iProduct } from '../../Interfaces/iDatabase'

// Hooks
import { useAuth } from '../../Hooks/useAuth'
import { useProducts } from '../../Hooks/useProducts'

export const MyProducts: React.FC = () => {
  const [products, setProducts] = useState<iProduct[] | null>(null)
  const { user } = useAuth()
  const { getUserProducts } = useProducts()

  useEffect(() => {
    if (!!user && !!user.email) setProducts(getUserProducts(user.email))
  }, [getUserProducts, user])

  return (
    <div>
      Mis Productos
      <ul>
        {!!products &&
          products.map(item => (
            <li key={item.id}>
              {item.type} {item.brand} {item.model}
            </li>
          ))}
      </ul>
    </div>
  )
}
