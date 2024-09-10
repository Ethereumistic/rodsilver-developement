import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';

interface ProductType {
    image: { asset: { _ref: string } }[];
    name: string;
    slug: { current: string };
    price: number;
    details: string;
  }

  const Product = ({ product: { image, name, slug, price, details } }: { product: ProductType }) => {
    return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="cursor-pointer transition duration-300 ease-in-out 
        transform hover:scale-105 border border-gray-200 rounded-xl p-4">
          <Image 
            alt={name}
            src={urlFor(image && image[0]).url()}
            width={250}
            height={250}
            className="rounded-xl"
          />
          <p className="font-geist-sans text-xl">{name}</p>
          <p className="font-geist-sans text-2xl mt-1">${price}</p>
          <p className="font-geist-sans text-2xl mt-1">{details}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product