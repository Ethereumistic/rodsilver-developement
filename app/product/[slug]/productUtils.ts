import { client } from '@/sanity/lib/client'
import { ProductType } from '@/types/product'

export async function getProduct(slug: string): Promise<ProductType> {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]{
    ...,
    collection->{
      name,
      slug,
      parentCollection->{
        name,
        slug
      }
    }
  }`
  return client.fetch(query)
}

export async function getProducts(): Promise<ProductType[]> {
  const query = `*[_type == "product"]{
    ...,
    collection->{
      name,
      slug,
      parentCollection->{
        name,
        slug
      }
    }
  }`
  return client.fetch(query)
}

export async function getCollections() {
  const query = `*[_type == "collection"]{
    name,
    slug,
    parentCollection->{
      name,
      slug
    }
  }`
  return client.fetch(query)
}