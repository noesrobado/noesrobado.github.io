import { iTransactionsType } from './Interfaces/iDatabase'

export const appConf: iConf = {
  user: {
    cantCreateProductMessage: 'Puede crear sólo 2 productos diarios.',
  },
  product: {
    errorProductIdExist:
      'El número de série ingresado ya ha sido usado en otro producto',
    types: [
      'Teléfono Móvil',
      'Notebook',
      'Cámara de Fotos',
      'Bicicleta',
      'Artículo Fotográfico',
      'Electrodomésticos',
    ],
  },
  transactions: {
    types: ['Venta', 'Regalo', 'Transferencia', 'Registro'],
  },
}

interface iConf {
  user: {
    cantCreateProductMessage: string
  }
  product: {
    errorProductIdExist: string
    types: string[]
  }
  transactions: {
    types: iTransactionsType[]
  }
}
