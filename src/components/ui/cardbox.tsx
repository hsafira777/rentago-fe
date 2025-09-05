import { ReactNode } from "react";

interface CardBoxProps {
  children: ReactNode;
  className?: string;
}

export default function CardBox({ children, className = "" }: CardBoxProps) {
  return (
    <div
      className={`bg-white w-full max-w-md rounded-xl shadow-lg p-6 ${className}`}
    >
      {children}
    </div>
  );
}