import { useEffect, useState, createContext, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from '../Services/firebase'

// Interfaces
import { iProduct, iProductType } from '../Interfaces/iDatabase'

// Hook
import { useAuth } from './useAuth'

interface ctx {
  products: iProduct[]
  updateProduct: Function
  addProduct: Function
}

const initialProps: ctx = {
  products: [],
  updateProduct() {},
  addProduct() {},
}
const Context = createContext<ctx>(initialProps)
Context.displayName = 'Products of user'

export const useProducts = () => useContext(Context)

export const ProductsProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const dbName = 'products'
  const history = useHistory()
  const [products, setProducts] = useState<iProduct[]>([])
  const { user } = useAuth()

  useEffect(() => {
    const getProducts = async () => {
      if (!user || !user.email) return
      const data: iProduct[] = []
      const productsRef = collection(db, dbName)
      const q = query(productsRef, where('owner', '==', user.email))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach(doc => {
        const item = doc.data() as iProduct
        console.log(doc)

        item.docID = doc.id
        //@ts-expect-error
        item.transactions?.map(t => (t.date = t.date.toDate()))
        data.push(item)
      })
      setProducts(data)
    }
    getProducts()
  }, [user])

  /**
   * Add new product
   */
  const addProduct = async ({
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

    // Production Mode

    try {
      const docRef = await addDoc(collection(db, dbName), newProduct)
      console.log(`Document added with id: ${docRef.id}`)

      // Update state
      setProducts([newProduct, ...products])
      history.push('/')
    } catch (e) {
      console.error('Error adding document: ', e)
    }
  }

  const getProductData = (id: string) =>
    products.filter(item => item.docID === id)[0]

  /**
   * Update description of product
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
      setProducts(items => [
        newItem,
        ...items.filter(item => item.docID !== id),
      ])
      const docRef = doc(db, dbName, `${newItem.docID}`)
      await updateDoc(docRef, { ...data })
    } catch (error) {
      console.error(error)
      return false
    }
    return true
  }

  return (
    <Context.Provider value={{ products, updateProduct, addProduct }}>
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
