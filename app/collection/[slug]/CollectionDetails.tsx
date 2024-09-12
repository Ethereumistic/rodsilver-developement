'use client'
import React, { useState, useEffect } from 'react'
import { CollectionType } from '@/types/collection'
import { ProductType } from '@/types/product'
import ProductList from '@/app/product/[slug]/ProductList'

interface CollectionDetailsProps {
  collection: CollectionType
  allProducts: ProductType[]
  allCollections: CollectionType[]
}

export default function CollectionDetails({ collection, allProducts, allCollections }: CollectionDetailsProps) {
  const [selectedCollections, setSelectedCollections] = useState<string[]>([collection._id])
  const [selectedSubCategories, setSelectedSubCategories] = useState<Record<string, string[]>>({})
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])

  const parentCollections = allCollections.filter(c => c.isParent)

  useEffect(() => {
    const newFilteredProducts = allProducts.filter(product => 
      product.collection && 
      selectedCollections.includes(product.collection._id) &&
      (selectedSubCategories[product.collection._id]?.length === 0 || 
       !selectedSubCategories[product.collection._id] ||
       selectedSubCategories[product.collection._id]?.includes(product.subCategory || ''))
    )
    setFilteredProducts(newFilteredProducts)
    console.log('Filtered Products:', newFilteredProducts) // Debug log
  }, [selectedCollections, selectedSubCategories, allProducts])

  const handleCollectionChange = (collectionId: string) => {
    setSelectedCollections(prev => 
      prev.includes(collectionId) 
        ? prev.filter(id => id !== collectionId)
        : [...prev, collectionId]
    )
    if (!selectedSubCategories[collectionId]) {
      setSelectedSubCategories(prev => ({
        ...prev,
        [collectionId]: []
      }))
    }
  }

  const handleSubCategoryChange = (collectionId: string, subCategory: string) => {
    setSelectedSubCategories(prev => ({
      ...prev,
      [collectionId]: prev[collectionId]?.includes(subCategory)
        ? prev[collectionId].filter(cat => cat !== subCategory)
        : [...(prev[collectionId] || []), subCategory]
    }))
  }

  const getSubCategories = (collectionId: string) => {
    return Array.from(new Set(allProducts
      .filter(p => p.collection && p.collection._id === collectionId)
      .map(p => p.subCategory)
      .filter(Boolean))) as string[]
  }

  console.log('Selected Collections:', selectedCollections) // Debug log
  console.log('All Products:', allProducts) // Debug log

  return (
    <div className="flex">
      {/* Side menu */}
      <div className="w-1/4 p-4 bg-gray-100">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        {parentCollections.map(col => (
          <div key={col._id} className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCollections.includes(col._id)}
                onChange={() => handleCollectionChange(col._id)}
                className="mr-2"
              />
              {col.name}
            </label>
            {selectedCollections.includes(col._id) && (
              <div className="ml-4 mt-2">
                <h3 className="font-bold mb-2">Sub-categories</h3>
                {getSubCategories(col._id).map(subCat => (
                  <div key={subCat} className="mb-1">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSubCategories[col._id]?.includes(subCat)}
                        onChange={() => handleSubCategoryChange(col._id, subCat)}
                        className="mr-2"
                      />
                      {subCat}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-2">{collection.name}</h1>
        <p className="mb-4">{collection.description}</p>
        <ProductList products={filteredProducts} />
      </div>
    </div>
  )
}