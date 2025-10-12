import CardBox from "@/components/ui/cardbox";
import { ReactNode } from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
  color?: "blue" | "green" | "red" | "yellow" | "purple";
};

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  red: "bg-red-100 text-red-600",
  yellow: "bg-yellow-100 text-yellow-600",
  purple: "bg-purple-100 text-purple-600",
};

export default function StatCard({
  title,
  value,
  icon,
  subtitle,
  color = "blue",
}: StatCardProps) {
  return (
    <CardBox className="flex items-center gap-4 hover:shadow-md transition-shadow duration-200">
      <div
        className={`p-3 rounded-full flex items-center justify-center ${colorMap[color]}`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
        {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
      </div>
    </CardBox>
  );
}
