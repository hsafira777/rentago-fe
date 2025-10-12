export interface RoomAvailability {
  id: string;
  date: string;
  availability: number; 
}

export default interface Room {
  id: string;
  name: string;
  description?: string;
  basePrice: number;
  capacity: number;
  availability: RoomAvailability[];
}