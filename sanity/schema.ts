import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import banner from './banner'
import collection from './collection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product, banner, collection],
}
