import React from 'react'
import { client } from '@/sanity/lib/client'
import Product from '@/app/components/Product'
import { ProductType } from '@/types/product'

async function getData() {
  const query = '*[_type == "product"]'
  const products: ProductType[] = await client.fetch(query)

  return { products }
}

export default async function Home() {
  const { products } = await getData()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          {products?.map((product: ProductType) => <Product key={product._id} product={product} />)}
        </div>

        <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
        <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
        <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
        <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
        <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>

      </main>
    </div>
  );
}