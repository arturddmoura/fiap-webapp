export interface ProductItem {
  id: number
  price: number
  name: string
  picture: string
  description: string
  available_quantity: number
}

export const getProducts = async () => {
  const res = await fetch(`http://localhost:3000/products`)
  return res.json()
}
