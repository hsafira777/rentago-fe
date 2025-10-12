import { PeakSeasonRate } from "../interface/calendar";

export function applyPeakRate(basePrice: number, rate?: PeakSeasonRate) {
  if (!rate) return basePrice;
  if (rate.adjustmentType === "PERCENTAGE") {
    return Math.round(basePrice + basePrice * (rate.adjustmentValue / 100));
  }
  return Math.round(basePrice + rate.adjustmentValue);
}