import React from "react";
import type Room  from "../interface/room";

export default function RoomSelector({
  rooms,
  selectedRoomId,
  onChange,
}: {
  rooms: Room[];
  selectedRoomId?: string | null;
  onChange: (id: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Select Room Type
      </label>
      <select
        className="w-full rounded-lg border-gray-300 text-sm py-2"
        value={selectedRoomId || ""}
        onChange={(e) => onChange(e.target.value)}
      >
        {rooms.map((r) => (
          <option key={r.id} value={r.id}>{`${
            r.name
          } — Rp ${r.basePrice.toLocaleString("id-ID")}`}</option>
        ))}
      </select>
    </div>
  );
}
