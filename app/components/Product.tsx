import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/client';

interface ProductType {
    image: { asset: { _ref: string } }[];
    name: string;
    slug: { current: string };
    price: number;
  }

  const Product = ({ product: { image, name, slug, price } }: { product: ProductType }) => {
    return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image 
            alt={name}
            src={urlFor(image && image[0]).url()}
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product