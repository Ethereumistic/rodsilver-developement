import React from 'react'
import Product from '@/app/product/[slug]/Product'
import { ProductType } from '@/types/product'

export default function ProductList({ products }: { products: ProductType[] }) {
  return (
    <div className='flex flex-wrap gap-4 justify-center mt-20 w-full'>
      {products?.map((product: ProductType) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  )
}