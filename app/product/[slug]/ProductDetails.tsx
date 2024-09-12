'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { urlFor } from '@/sanity/lib/client'
import { ProductType } from '@/types/product'
import { IconMinus, IconPlus, IconStarFilled, IconStar } from '@tabler/icons-react'
import { useStateContext } from '@/context/StateContext'
import { Lens } from "@/app/components/ui/lens";
import ProductList from './ProductList'


const ProductDetails = ({ product, relatedProducts }: { product: ProductType, relatedProducts: ProductType[] }) => {

    const [index, setIndex] = useState(0);
    const { decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
    const [hovering, setHovering] = useState(false);

  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='product-detail-image'>
          <Lens hovering={hovering} setHovering={setHovering}>
            {product.image.length > 0 && (
              <Image 
                alt={product.name}
                width={500}
                height={500}
                src={urlFor(product.image[index]).url()}
                className='rounded-xl'
              />
            )}
          </Lens>

          </div>

          <div className='small-images-container'>
            {product.image.map((image, i) => (
              <Image 
                alt={product.name}
                width={70}
                height={70}
                key={i}
                src={urlFor(image).url()}
                className={i === index ? 'small-image selected-image' : 'small-image'}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div>
            <h1 className='text-3xl font-geist-sans'>{product.name}</h1>
            <div className='mt-3 flex gap-1 items-center'>
                <div className='flex'>
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStarFilled />
                <IconStar />
                </div>
                <p className='mt-0'>(20)</p>
            </div>
            <h4 className='text-3xl font-geist-sans'>Детайли:</h4>
            <p className='text-2xl font-geist-sans'>${product.description}</p>
            <p className='text-2xl font-geist-sans'>${product.price}</p>

            <div>
            <h3>Количество:</h3>
            <p className='border border-1 border-gray-500 rounded-md p-2 flex items-center w-min'>
                <span className='cursor-pointer text-lg py-1 px-2'
                onClick={decQty}
                >
                    <IconMinus className='text-gray-800 rounded-md p transition-all duration-300 hover:bg-gray-400 hover:text-white hover:scale-150' />
                </span>
                <span className='cursor-pointer text-lg py-1 px-2'>
                    {qty}
                </span>
                <span className='cursor-pointer text-lg py-1 px-2'
                onClick={incQty}
                >
                    <IconPlus className='text-gray-800 rounded-md p transition-all duration-300 hover:bg-gray-300 hover:text-white hover:scale-150' />
                </span>
            </p>
            </div>

            <div className='flex flex-col gap-2'>
                <button className='bg-gray-800 text-white rounded-md py-2 px-6 mt-2 transition-all duration-300 hover:scale-105'
                onClick={() => {
                  onAdd({ ...product, quantity: qty }, qty);
                  setShowCart(true);
                }}
                >Добави в количката</button>
                <button className='bg-gray-800 text-white rounded-md py-2 px-6 mt-2 transition-all duration-300 hover:scale-105'>Купи Сега</button>
            </div>
        </div>



      </div>
      <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>
          <h1 className="text-4xl font-pacifico mb-32">Hello World</h1>

          <div>
            <h2>Продукти, който може да харесвате</h2>
            <div className='marquee'>
              <div className='maylike-products-container'>
              <ProductList products={relatedProducts} />
              </div>
            </div>
          </div>
    </div>
  )
}

export default ProductDetails