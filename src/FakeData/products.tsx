// Interfaces
import { iProduct } from '../Interfaces/iDatabase'

// Data
import { fakeUser } from './users'

export let fakeProducts: iProduct[] = [
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
        from: fakeUser[0],
      },
    ],
    owner: fakeUser[0],
  },
  {
    id: '00000000000002',
    brand: 'Xiaomi',
    model: 'Mi 9T',
    state: 'Normal',
    type: 'Teléfono Movil',
    transactions: [
      {
        date: new Date('2005-01-01 00:00:01'),
        type: 'Sale',
        from: fakeUser[0],
      },
    ],
    owner: fakeUser[0],
  },
  {
    id: '00000000000003',
    brand: 'Canyon',
    model: 'Grail 6',
    state: 'Normal',
    type: 'Bicicleta',
    transactions: [
      {
        date: new Date('2005-01-01 00:00:01'),
        type: 'Sale',
        from: fakeUser[0],
      },
    ],
    owner: fakeUser[0],
  },
]
