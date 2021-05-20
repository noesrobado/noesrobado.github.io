// Interfaces
import { iProduct } from '../Interfaces/iDatabase'

// Fake Data
import { fakeProducts } from '../FakeData/products'

export const useProducts = () => {
  /**
   * Return array with products of user.
   *
   * @param email: string
   * @returns iProducts[]
   */
  const getUserProducts = (email: string): iProduct[] => {
    // Get array products of user from database or fakeData
    let results: iProduct[] = []

    if (process.env.NODE_ENV === 'development') {
      // Return from mock
      results = [...fakeProducts]
    } else {
      // return from database
    }
    return results.filter(item => item.owner.email === email)
  }

  return {
    getUserProducts,
  }
}
