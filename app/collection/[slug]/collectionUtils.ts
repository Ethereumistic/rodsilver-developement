import { client } from '@/sanity/lib/client'
import { CollectionType } from '@/types/collection'
import { ProductType } from '@/types/product'

export async function getCollection(slug: string): Promise<CollectionType> {
  const query = `*[_type == "collection" && slug.current == '${slug}'][0]{
    ...,
    "subcollections": *[_type == "collection" && references(^._id)]{
      _id,
      name,
      slug,
      subCategory
    },
    parentCollections[]->{
      _id,
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
      _id,
      name,
      slug,
      isParent,
      subCategory,
      parentCollection->{
        _id,
        name,
        slug
      }
    }
  }`
  return client.fetch(query)
}
export async function getCollections(): Promise<CollectionType[]> {
  const query = `*[_type == "collection" && isParent == true]{
    _id,
    name,
    slug,
    image,
    isParent
  }`
  return client.fetch(query)
}

export async function getAllProducts(): Promise<ProductType[]> {
  const query = `*[_type == "product"]{
    _id,
    name,
    slug,
    description,
    price,
    image,
    subCategory,
    collection->{
      _id,
      name,
      slug,
      isParent,
      subCategory,
      parentCollection->{
        _id,
        name,
        slug
      }
    }
  }`
  return client.fetch(query)
}