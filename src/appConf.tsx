import { iTransactionsType } from './Interfaces/iDatabase'

export const appConf: iConf = {
  user: {
    cantCreateProductMessage: 'Puede crear sólo 2 productos diarios.',
  },
  product: {
    errorProductIdExist:
      'El número de série ingresado ya ha sido usado en otro producto',
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
  }
  transactions: {
    types: iTransactionsType[]
  }
}
