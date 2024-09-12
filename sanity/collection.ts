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
      name: 'parentCollection',
      title: 'Parent Collection',
      type: 'reference',
      to: [{ type: 'collection' }],
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
}