import ProductDetails from './ProductDetails'
import { getProduct, getProducts } from './productUtils'
import { ProductType } from '@/types/product'

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product: ProductType) => ({
    slug: product.slug.current,
  }))
}

export default async function Page({ params }: { params: { slug: string } }) {
  const product: ProductType = await getProduct(params.slug)
  const relatedProducts: ProductType[] = await getProducts()

  return <ProductDetails product={product} relatedProducts={relatedProducts} />
}