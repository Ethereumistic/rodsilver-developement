export interface ProductType {
  _id: string;
  name: string;
  slug: { current: string };
  description?: string;
  price: number;
  images: { asset: { _ref: string } }[];
  collection: {
    _id: string;
    name: string;
    slug: { current: string };
    isParent?: boolean;
    subCategory?: string;
    parentCollection?: {
      _id: string;
      name: string;
      slug: { current: string };
    };
  };
  subCategory?: string;
  // ... other properties ...
}