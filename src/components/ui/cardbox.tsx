import { ReactNode } from "react";

interface CardBoxProps {
  children: ReactNode;
  className?: string;
  noShadow?: boolean;
  noPadding?: boolean;
  noBg?: boolean;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl";
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "full";
}

const maxWidthClasses: Record<NonNullable<CardBoxProps["maxWidth"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
  full: "max-w-full",
};

export default function CardBox({
  children,
  className = "",
  noShadow = false,
  noPadding = false,
  noBg = false,
  rounded = "xl",
  maxWidth = "md",
}: CardBoxProps) {
  return (
    <div
      className={`
        w-full
        ${maxWidthClasses[maxWidth]}
        ${noBg ? "" : "bg-white"}
        ${noShadow ? "" : "shadow-lg"}
        ${noPadding ? "" : "p-6"}
        rounded-${rounded}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
