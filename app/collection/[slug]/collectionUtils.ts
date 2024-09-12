import { client } from '@/sanity/lib/client'
import { CollectionType } from '@/types/collection'
import { ProductType } from '@/types/product'

export async function getCollection(slug: string): Promise<CollectionType> {
  const query = `*[_type == "collection" && slug.current == '${slug}'][0]{
    ...,
    parentCollection->{
      name,
      slug
    }
  }`
  return client.fetch(query)
}

export async function getProductsByCollection(slug: string): Promise<ProductType[]> {
  const query = `*[_type == "product" && collection->slug.current == '${slug}']{
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

export async function getCollections(): Promise<CollectionType[]> {
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