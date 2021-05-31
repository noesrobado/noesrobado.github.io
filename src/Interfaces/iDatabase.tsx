export interface iProduct {
  docID?: string
  id: string
  type: string
  state: iProductState
  brand: string
  model: string
  description?: string
  transactions?: iTransactions[]
  pictures?: string[]
  owner: string
  dates: {
    created: Date
    updated: Date
  }
}

export type iProductState = 'Normal' | 'Desechado' | 'Denunciado' | 'Registrado'

export interface iTransactions {
  date: Date
  type: iTransactionsType
  from: string
  to?: string
}

export type iTransactionsType =
  | 'Venta'
  | 'Regalo'
  | 'Transferencia'
  | 'Registro'

// export interface iUser {
//   email: string
//   registerDate: Date
// }

// export type iProductType =
//   | 'Teléfono Móvil'
//   | 'Notebook'
//   | 'Cámara de Fotos'
//   | 'Bicicleta'
