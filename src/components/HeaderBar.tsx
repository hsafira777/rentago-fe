"use client";

import { useRouter } from "next/navigation";
import { User as UserIcon, LogOut } from "lucide-react";
import useAuthStore from "@/store/useAuthStore";
import Button from "@/components/ui/button";

export default function HeaderBar() {
  const { user } = useAuthStore();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="flex items-center justify-between bg-white shadow px-6 py-4 rounded-xl mb-6">
      {/* Welcome message */}
      <div>
        <h2 className="text-xl font-bold">
          Welcome back, {user.name || user.email}!
        </h2>
        <p className="text-sm text-gray-500">
          Here's what's happening with your properties today.
        </p>
      </div>

      {/* Right section: profile + actions */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
            <UserIcon className="text-blue-600" size={18} />
          </div>
          <div className="text-sm">
            <p className="font-medium">{user.name || "Guest"}</p>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => router.push("/profile")}>
          Profile
        </Button>
      </div>
    </div>
  );
}
