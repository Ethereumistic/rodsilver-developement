import { client } from '@/sanity/lib/client'
import { ProductType } from '@/types/product'

export async function getProduct(slug: string): Promise<ProductType> {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`
  return client.fetch(query)
}

export async function getProducts(): Promise<ProductType[]> {
  const query = '*[_type == "product"]'
  return client.fetch(query)
}