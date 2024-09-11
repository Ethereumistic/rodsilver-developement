export interface ProductType {
    _id: string;
    image: { asset: { _ref: string } }[];
    name: string;
    slug: { current: string };
    price: number;
    details: string;
    quantity?: number;
  }