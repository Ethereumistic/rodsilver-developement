import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CollectionType } from '@/types/collection'
import { urlFor } from '@/sanity/lib/client'

export default function CollectionList({ collections }: { collections: CollectionType[] }) {
  return (
    <div className='flex flex-wrap gap-4 justify-center mt-20 w-full'>
      {collections?.map((collection: CollectionType) => {
        const imageUrl = collection.image ? urlFor(collection.image).width(250).height(250).url() : null

        return (
          <Link key={collection._id} href={`/collection/${collection.slug.current}`}>
            <div className="cursor-pointer transition duration-300 ease-in-out 
            transform hover:scale-105 border border-gray-200 rounded-xl p-4">
              {collection.image && imageUrl && (
                <img 
                  src={imageUrl}
                  alt={collection.name}
                  width={250}
                  height={250}
                  className="rounded-xl mb-2 object-cover"
                />
              )}
              <h2 className="font-geist-sans text-xl">{collection.name}</h2>
              {collection.parentCollections && collection.parentCollections.length > 0 && (
                <p className="font-geist-sans text-sm mt-1 text-gray-500">
                  Parents: {collection.parentCollections.map(parent => parent.name).join(', ')}
                </p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}