"use client";

import { Menu } from "lucide-react";
import  Button  from "@/components/ui/button";

type HeaderProps = {
  onToggleSidebar?: () => void;
};

export function Header({ onToggleSidebar }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white border-b px-6 py-4 shadow-sm">
      <div className="flex items-center gap-4">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
    </header>
  );
}
