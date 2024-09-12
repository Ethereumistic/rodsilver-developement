import Image from 'next/image'
import { getCollection, getProductsByCollection, getCollections } from './collectionUtils'
import { ProductType } from '@/types/product'
import { CollectionType } from '@/types/collection'
import ProductList from '@/app/product/[slug]/ProductList'
import { urlFor } from '@/sanity/lib/client'

export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((collection: CollectionType) => ({
    slug: collection.slug.current,
  }))
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const collection: CollectionType = await getCollection(params.slug)
  const products: ProductType[] = await getProductsByCollection(params.slug)

  return (
    <div>
      {collection.image && (
        <Image 
          src={urlFor(collection.image).url()}
          alt={collection.name}
          width={500}
          height={300}
          className="rounded-xl mb-4"
        />
      )}
      <h1>{collection.name}</h1>
      <p>{collection.description}</p>
      <ProductList products={products} />
    </div>
  )
}