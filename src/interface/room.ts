export default interface Room {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  capacity: number;
  availability: { date: string; isAvailable: boolean }[];
}