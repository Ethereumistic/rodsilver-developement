import { createClient } from 'next-sanity'
import createImageUrlBuilder from '@sanity/image-url'


export const client = createClient({
  apiVersion: '2024-05-08',
  dataset: 'production',
  projectId: 'kxlmj7gw',
  useCdn: true,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

const builder = createImageUrlBuilder(client)

export const urlFor = (source: any) => builder.image(source)
