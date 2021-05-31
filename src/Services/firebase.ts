import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, DocumentData, getFirestore, Timestamp, updateDoc } from "firebase/firestore"
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

