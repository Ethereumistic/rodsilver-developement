import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CollectionType } from '@/types/collection'
import { urlFor } from '@/sanity/lib/client'

export default function CollectionList({ collections }: { collections: CollectionType[] }) {
  return (
    <div className='flex flex-wrap gap-4 justify-center mt-20 w-full'>
      {collections?.map((collection: CollectionType) => (
        <Link key={collection._id} href={`/collection/${collection.slug.current}`}>
          <div className="cursor-pointer transition duration-300 ease-in-out 
          transform hover:scale-105 border border-gray-200 rounded-xl p-4">
            {collection.image && (
              <Image 
                src={urlFor(collection.image).url()}
                alt={collection.name}
                width={250}
                height={250}
                className="rounded-xl mb-2"
              />
            )}
            <h2 className="font-geist-sans text-xl">{collection.name}</h2>
            {collection.parentCollection && (
              <p className="font-geist-sans text-sm mt-1 text-gray-500">
                Parent: {collection.parentCollection.name}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}