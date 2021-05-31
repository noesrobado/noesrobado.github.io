import { formatDistance } from 'date-fns'
import { es } from 'date-fns/locale'

// Hooks
import { useProducts } from '../../Hooks/useProducts'
import { Link } from 'react-router-dom'

// Interfaces
import { iProductState } from '../../Interfaces/iDatabase'
interface iProps {
  filterProducts?: iProductState | 'Todos'
}

export const ProductsList: React.FC<iProps> = ({
  filterProducts = 'Todos',
}) => {
  const { products } = useProducts()

  const itemSates: any = {
    Normal: {
      style: {},
      icon: 'check_circle',
    },
    Desechado: {
      style: {
        textDecoration: 'line-through',
        color: 'darkgrey',
      },
      icon: 'delete',
    },
    Denunciado: {
      style: {
        color: 'var(--color-danger)',
      },
      icon: 'warning',
    },
    Registrado: {
      style: {
        color: 'var(--color-dark)',
      },
      icon: 'check_circle',
    },
  }

  return (
    <ul>
      {products
        .filter(item =>
          filterProducts === 'Todos' ? item : item.state === filterProducts
        )
        .map(item => (
          <li
            key={item.id}
            className={`${item.state.toLocaleLowerCase()} box-shadow---NO`}
            title={`Propietario desde ${formatDistance(
              item.dates.created,
              new Date(),
              {
                addSuffix: true,
                locale: es,
              }
            )}\nNúmero de série: ${item.id}`}
            style={{
              margin: '1.5em 0',
              letterSpacing: 2,
              borderRadius: 15,
            }}
          >
            <Link
              to={'/producto/' + item.docID}
              style={{ ...itemSates[item.state].style }}
            >
              {item.type} {item.brand} {item.model}
            </Link>
          </li>
        ))}
    </ul>
  )
}
