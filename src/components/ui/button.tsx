import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  active?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  active = false,
  className = "",
  ...props
}: ButtonProps) {
  let base =
    "px-4 py-2 rounded-lg border transition font-medium focus:outline-none";

  let styles = "";
  if (variant === "primary") {
    styles = "bg-blue-600 text-white hover:bg-blue-700 border-blue-600";
  } else if (variant === "secondary") {
    styles = active
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300";
  }

  return (
    <button {...props} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
