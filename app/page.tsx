import React from 'react'
import { client } from '@/sanity/lib/client'
import Product from '@/app/components/Product'
import { ProductType } from '@/types/product'
import { ImagesSliderDemo } from '@/app/components/ImagesSliderDemo'

async function getData() {
  const query = '*[_type == "product"]'
  const products: ProductType[] = await client.fetch(query, {}, { next: { revalidate: 60 } })

  return { products }
}

export default async function Home() {
  const { products } = await getData()

  return (
    <div>
      <ImagesSliderDemo />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        
        <div className='flex flex-wrap gap-4 justify-center mt-20 w-full'>
          {products?.map((product: ProductType) => <Product key={product._id} product={product} />)}
        </div>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
        </div>
      </div>
    </div>
  );
}