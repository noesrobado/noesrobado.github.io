export interface iProducts {
  id: string
  type: iProductType
  state: iProductState
  brand: string
  model: string
  description?: string
  transactions: iTransactions[]
  pictures?: string[]
}

export type iProductType =
  | 'Teléfono Movil'
  | 'Tablet'
  | 'Notebook'
  | 'Cámara de Fotos'
  | 'Accesorio Fotográfico'
  | 'Bicicleta'

export type iProductState =
  | 'Normal'
  | 'En la basura'
  | 'Denunciado'
  | 'Registrado'

export interface iTransactions {
  date: Date
  type: iTransactionsType
  from: iUser
  to?: iUser
}

export type iTransactionsType = 'Sale' | 'Gift' | 'Transference'

export interface iUser {
  email: string
  registerDate: Date
}
