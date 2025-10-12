import { ReactNode } from "react";

export function Table({ children }: { children: ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">{children}</table>
    </div>
  );
}

export function TableHeader({ children }: { children: ReactNode }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-gray-200">{children}</tbody>;
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="hover:bg-gray-50">{children}</tr>;
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <th className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
      {children}
    </th>
  );
}

export function TableCell({ children }: { children: ReactNode }) {
  return <td className="px-4 py-2 text-sm text-gray-600">{children}</td>;
}
