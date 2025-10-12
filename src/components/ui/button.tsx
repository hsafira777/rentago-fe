import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "white" | "ghost" | "danger";
  active?: boolean;
  size?: "default" | "icon";
}

export default function Button({
  children,
  variant = "primary",
  active = false,
  size = "default",
  className = "",
  ...props
}: ButtonProps) {
  let base =
    "inline-flex items-center justify-center rounded-lg border transition font-medium focus:outline-none";

  // size
  let sizeClass = "";
  if (size === "default") {
    sizeClass = "px-4 py-2";
  } else if (size === "icon") {
    sizeClass = "p-2 h-10 w-10";
  }

  // variant
  let styles = "";
  if (variant === "primary") {
    styles = "bg-blue-600 text-white hover:bg-blue-700 border-blue-600";
  } else if (variant === "secondary") {
    styles = active
      ? "bg-blue-600 text-white border-blue-600"
      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300";
  } else if (variant === "white") {
    styles =
      "bg-white text-gray-800 border-gray-300 hover:bg-gray-50 hover:shadow";
  } else if (variant === "ghost") {
    styles =
      "bg-transparent border-0 text-gray-600 hover:bg-gray-100 hover:text-gray-900";
  } else if (variant === "danger") {
    styles = "bg-red-600 text-white hover:bg-red-700 border-red-600";
  }

  return (
    <button
      {...props}
      className={`${base} ${sizeClass} ${styles} ${className}`}
    >
      {children}
    </button>
  );
}
