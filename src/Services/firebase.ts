import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, DocumentData, getFirestore, Timestamp, updateDoc, where, query, getDocs } from "firebase/firestore"
import { iProduct } from '../Interfaces/iDatabase';

var firebaseConfig = {
  apiKey: "AIzaSyCaBB95IOyfGTCuRnLFrtg3KQiL4myiGA4",
  authDomain: "noesrobado-app.firebaseapp.com",
  databaseURL: "https://noesrobado-app-default-rtdb.firebaseio.com",
  projectId: "noesrobado-app",
  storageBucket: "noesrobado-app.appspot.com",
  messagingSenderId: "96848561278",
  appId: "1:96848561278:web:1173f14988816e4573442f",
  measurementId: "G-Y31PM071CX"
};
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore();

export const productDB = collection(db, 'products')

export const addNewProduct = async (
  data: DocumentData
) =>
  await addDoc(productDB, data)


export const updateProducts = async (id: string, updateData: Partial<iProduct>) => {
  const docRef = doc(db, 'products', id)
  const data = {
    ...updateData,
    'dates.updated': new Date(),
  }
  await updateDoc(docRef, data)
}

export const timestampToDate = (timestamp: Timestamp | Date): Date => {
  const date = timestamp as Timestamp
  return date.toDate()
}

export const getProductByKey = async (key: number) => {
  console.log('Searching for key: ' + key);
  let product: iProduct | null = null
  const q = query(productDB, where("publicKey", "==", key))
  const querySnapshot = await getDocs<iProduct>(q);
  querySnapshot.forEach((doc) => {
    const item: iProduct = {
      docID: doc.id,
      ...doc.data(),
      publicKeyExpiration: timestampToDate(doc.data().publicKeyExpiration as unknown as Timestamp),
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
    if (timestampToDate(doc.data().publicKeyExpiration as unknown as Timestamp) > new Date)
      product = item
  })
  return product
}