import { getCollection, getAllProducts, getCollections } from './collectionUtils'
import { ProductType } from '@/types/product'
import { CollectionType } from '@/types/collection'
import CollectionDetails from './CollectionDetails'

export async function generateStaticParams() {
  const collections = await getCollections()
  return collections.map((collection: CollectionType) => ({
    slug: collection.slug.current,
  }))
}

export default async function CollectionPage({ params }: { params: { slug: string } }) {
  const collection: CollectionType = await getCollection(params.slug)
  const allProducts: ProductType[] = await getAllProducts()
  const allCollections: CollectionType[] = await getCollections()

  return (
    <div>
      <CollectionDetails 
        collection={collection}  
        allCollections={allCollections} 
        allProducts={allProducts} 
      />
    </div>
  )
}