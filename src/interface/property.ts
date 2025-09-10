export default interface Property {
  id: string;
  name: string;
  city: string;
  province: string;
  description: string;
  price?: number | null;
  pictures: { url: string }[];
}