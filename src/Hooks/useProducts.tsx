import { useEffect, useState, createContext, useContext } from 'react'
import { getDocs, query, Timestamp, where } from 'firebase/firestore'
import { updateProducts, addNewProduct, productDB } from '../Services/firebase'
import { timestampToDate } from '../Services/firebase'

// Interfaces
import {
  iProduct,
  iProductType,
  iTransactions,
  iTransactionsType,
} from '../Interfaces/iDatabase'

// Hook
import { useAuth } from './useAuth'

interface initialPropsTypes {
  products: iProduct[]
  updateProduct: Function
  addProduct: Function
  addTransactions: Function
}

const initialProps: initialPropsTypes = {
  products: [],
  updateProduct() {},
  addProduct() {},
  addTransactions() {},
}
const Context = createContext<typeof initialProps>(initialProps)
Context.displayName = 'Products of user'

export const useProducts = () => useContext(Context)

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [products, setProducts] = useState<iProduct[]>([])
  const { user, setCanCreate } = useAuth()

  useEffect(() => {
    if (!user || !user.email) return
    const getProducts = async () => {
      let data: iProduct[] = []

      const q = query(productDB, where('owner', '==', user.email))
      const querySnapshot = await getDocs<iProduct>(q)

      querySnapshot.forEach(doc => {
        const item: iProduct = {
          docID: doc.id,
          ...doc.data(),
          dates: {
            created: timestampToDate(
              doc.data().dates.created as unknown as Timestamp
            ),
            updated: timestampToDate(
              doc.data().dates.updated as unknown as Timestamp
            ),
          },
        }
        item.transactions?.map(
          trans =>
            (trans.date = timestampToDate(trans.date as unknown as Timestamp))
        )
        // Check if user can create new products
        const dateDiff = (+new Date() - +item.dates.created) / 24 / 60 / 60000
        if (dateDiff < 2) setCanCreate(false)

        data.push(item)
      })
      // Sort by created date
      data.sort((a, b) => a.dates.created.getTime() - b.dates.created.getTime())

      setProducts(data)
    }
    getProducts()
  }, [user, setCanCreate])

  /**
   * Add new product
   */
  const addProduct = ({
    id,
    type,
    brand,
    model,
    description,
  }: iRegisterProduct) => {
    const newProduct: iProduct = {
      id,
      type,
      brand,
      model,
      description,
      state: 'Normal',
      owner: user!.email!,
      transactions: [
        {
          date: new Date(),
          from: user!.email!,
          type: 'Registro',
        },
      ],
      dates: {
        created: new Date(),
        updated: new Date(),
      },
    }

    try {
      const result = addNewProduct(newProduct)
      result.then(doc =>
        setProducts([{ ...newProduct, docID: doc.id }, ...products])
      )
    } catch (error) {
      console.error('Error adding document: ', error)
    }
  }

  const getProductData = (id: string) =>
    products.filter(item => item.docID === id)[0]

  /**
   * Update product
   */
  const updateProduct = async (
    id: string,
    data: { description: string }
  ): Promise<boolean> => {
    // Get Product
    const item = getProductData(id)
    const newItem = { ...item, ...data }

    try {
      // Save Product
      updateProducts(id, data)
      setProducts(items => [
        newItem,
        ...items.filter(item => item.docID !== id),
      ])
      // const docRef = doc(db, dbName, `${newItem.docID}`)
      // await updateDoc(docRef, { ...data })
    } catch (error) {
      console.error(error)
      return false
    }
    return true
  }

  /**
   * addTransactions
   */
  const addTransactions = (
    docId: string,
    type: iTransactionsType,
    to: string
  ) => {
    const date = new Date()
    const from = user!.email!

    const newTransaction: iTransactions = {
      date,
      from,
      to,
      type,
    }
    const pro = products.filter(item => item.docID === docId)[0]
    const modifiedPro: iProduct = {
      ...pro,
      dates: {
        ...pro.dates,
        updated: new Date(),
      },
      owner: to,
      transactions: [newTransaction, ...pro.transactions!],
    }
    console.log(
      docId,
      products.filter(item => item.docID !== docId)
    )

    setProducts(prev => prev.filter(item => item.docID !== docId))
    updateProducts(docId, { ...modifiedPro })
  }

  return (
    <Context.Provider
      value={{ products, updateProduct, addProduct, addTransactions }}
    >
      {children}
    </Context.Provider>
  )
}

export interface iRegisterProduct {
  id: string
  type: iProductType
  brand: string
  model: string
  description?: string
}
