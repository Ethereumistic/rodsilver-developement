import { Rule } from '@sanity/types'

export default {
  name: 'collection',
  title: 'Collection',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'isParent',
      title: 'Is Parent Collection',
      type: 'boolean',
      description: 'Check if this is a parent collection (e.g., Rings, Necklaces)',
    },
    {
      name: 'parentCollections',
      title: 'Parent Collections',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      hidden: ({ document }: { document: Record<string, any> }) => document?.isParent,
    },
    {
      name: 'subCategory',
      title: 'Sub-category',
      type: 'string',
      description: 'Enter a sub-category name (e.g., Men, Women, Unisex, or any custom name)',
      hidden: ({ document }: { document: Record<string, any> }) => document?.isParent,
    },
  ],
}