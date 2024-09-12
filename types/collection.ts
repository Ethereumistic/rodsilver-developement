export interface CollectionType {
  _id: string;
  name: string;
  slug: { current: string };
  image: { asset: { _ref: string } };
  description?: string;
  isParent: boolean;
  parentCollection?: {
    _id: string;
    name: string;
    slug: { current: string };
  };
  subCategory?: string;
  subcollections?: CollectionType[];
}