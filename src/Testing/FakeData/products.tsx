// Interfaces
import { iProducts } from '../../Interfaces/iDatabase'

// Data
import { User } from './users'

export let products: iProducts[] = [
  {
    id: '00000000000001',
    brand: 'Nikon',
    model: 'D3200',
    state: 'Normal',
    type: 'Cámara de Fotos',
    transactions: [
      {
        date: new Date('2005-01-01 00:00:01'),
        type: 'Gift',
        from: User[0],
      },
    ],
  },
]
