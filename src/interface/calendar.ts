export interface Room {
  id: string;
  name: string;
  basePrice: number;
}

export interface Availability {
  id: string;
  roomId: string;
  date: string; // ISO yyyy-MM-dd
  availableQuantity: number;
  price: number;
}

export interface PeakSeasonRate {
  id: string;
  roomId: string;
  startDate: string; // ISO
  endDate: string; // ISO
  adjustmentType: "PERCENTAGE" | "NOMINAL";
  adjustmentValue: number;
}
