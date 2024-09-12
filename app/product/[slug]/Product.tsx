import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';
import { ProductType } from '@/types/product';



  

const Product = ({ product: { image, name, slug, price, description } }: { product: ProductType }) => {

      // Check if image array exists and has at least one item
  const imageUrl = image && image.length > 0 
  ? urlFor(image[0]).width(250).height(250).url()
  : 'https://cdn.jsdelivr.net/gh/Ethereumistic/rodsilver-assets/banner/banner5.jpg' // Replace with your placeholder image path

    return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="cursor-pointer transition duration-300 ease-in-out 
        transform hover:scale-105 border border-gray-200 rounded-xl p-4">
        {imageUrl && (
          <Image 
            src={imageUrl}
            alt={name}
            width={250}
            height={250}
            className="rounded-xl"
          />
        )}
          <p className="font-geist-sans text-xl">{name}</p>
          <p className="font-geist-sans text-2xl mt-1">${price}</p>
          <p className="font-geist-sans text-2xl mt-1">{description}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product