export interface CollectionType {
  _id: string;
  name: string;
  slug: { current: string };
  image: { asset: { _ref: string } };
  description?: string;
  parentCollection?: {
    name: string;
    slug: { current: string };
  };
}