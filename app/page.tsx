import React from 'react'
import { client } from '@/sanity/lib/client'
import Product from '@/app/product/[slug]/Product'
import { ProductType } from '@/types/product'
import { ImagesSliderDemo } from '@/app/components/ImagesSliderDemo'
import ProductList from './product/[slug]/ProductList'
import CollectionList from './collection/[slug]/CollectionList'
import { getCollections } from '@/app/collection/[slug]/collectionUtils'


async function getData() {
  const query = '*[_type == "product"]'
  const products: ProductType[] = await client.fetch(query, {}, { next: { revalidate: 60 } })

  return { products }
}

export default async function Home() {
  const { products } = await getData()
  const collections = await getCollections()
  
  return (
    <div>
      <ImagesSliderDemo />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <div className='flex flex-wrap gap-4 justify-center mt-20 w-full'>
          <ProductList products={products} />
        </div>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <CollectionList collections={collections} />

        </div>
      </div>
    </div>
  );
}