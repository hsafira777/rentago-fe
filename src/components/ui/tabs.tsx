"use client";

import { ReactNode, useState } from "react";

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
  className?: string;
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  activeTab?: string;
  setActiveTab?: (val: string) => void;
  children: ReactNode;
}

interface TabsContentProps {
  value: string;
  activeTab?: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultValue, children, className = "" }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className={`w-full ${className}`}>
      {Array.isArray(children)
        ? children.map((child, i) =>
            typeof child === "object" && child !== null
              ? { ...child, props: { ...child.props, activeTab, setActiveTab } }
              : child
          )
        : children}
    </div>
  );
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return (
    <div className={`flex border-b mb-4 space-x-2 ${className}`}>
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  activeTab,
  setActiveTab,
  children,
}: TabsTriggerProps) {
  const isActive = activeTab === value;
  return (
    <button
      type="button"
      onClick={() => setActiveTab && setActiveTab(value)}
      className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
        isActive
          ? "bg-blue-600 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  activeTab,
  children,
  className = "",
}: TabsContentProps) {
  if (activeTab !== value) return null;
  return <div className={className}>{children}</div>;
}
