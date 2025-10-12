"use client";

import { useState } from "react";
import { RoomInput } from "@/services/propertyServices";

interface RoomFormProps {
  rooms: RoomInput[];
  onChange: (rooms: RoomInput[]) => void;
}

interface TempRoomInput {
  name: string;
  description: string;
  basePrice: string;
  capacity: string;
  quantity: string;
}

const initialRoom: TempRoomInput = {
  name: "",
  description: "",
  basePrice: "",
  capacity: "",
  quantity: "",
};

export function RoomForm({ rooms, onChange }: RoomFormProps) {
  const [newRoom, setNewRoom] = useState<TempRoomInput>(initialRoom);

  const handleChange = (field: keyof TempRoomInput, value: string) => {
    setNewRoom((prev) => ({ ...prev, [field]: value }));
  };

  const addRoom = () => {
    if (
      !newRoom.name ||
      !newRoom.basePrice ||
      !newRoom.capacity ||
      !newRoom.quantity
    ) {
      alert("Lengkapi semua field room sebelum menambah.");
      return;
    }

    const convertedRoom: RoomInput = {
      name: newRoom.name,
      description: newRoom.description,
      basePrice: Number(newRoom.basePrice),
      capacity: Number(newRoom.capacity),
      quantity: Number(newRoom.quantity),
    };

    onChange([...rooms, convertedRoom]);
    setNewRoom(initialRoom);
  };

  const removeRoom = (index: number) => {
    onChange(rooms.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-lg">Rooms</h3>

      {/* List room yang sudah ditambahkan */}
      {rooms.length > 0 && (
        <div className="space-y-2">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="border p-3 rounded flex justify-between items-center bg-gray-50"
            >
              <div>
                <p className="font-medium">{room.name}</p>
                <p className="text-sm text-gray-600">
                  {room.description || "Tidak ada deskripsi"}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Harga: {room.basePrice.toLocaleString()} • Kapasitas:{" "}
                  {room.capacity} • Jumlah: {room.quantity}
                </p>
              </div>
              <button
                type="button"
                onClick={() => removeRoom(index)}
                className="text-red-600 text-sm hover:underline"
              >
                Hapus
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Form tambah room baru */}
      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="Nama Room"
          className="border p-2 rounded col-span-2"
          value={newRoom.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <input
          placeholder="Harga Dasar"
          type="number"
          className="border p-2 rounded"
          value={newRoom.basePrice}
          onChange={(e) => handleChange("basePrice", e.target.value)}
        />
        <input
          placeholder="Kapasitas"
          type="number"
          className="border p-2 rounded"
          value={newRoom.capacity}
          onChange={(e) => handleChange("capacity", e.target.value)}
        />
        <input
          placeholder="Jumlah"
          type="number"
          className="border p-2 rounded col-span-2 sm:col-span-1"
          value={newRoom.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
        />
        <textarea
          placeholder="Deskripsi (opsional)"
          className="border p-2 rounded col-span-2"
          value={newRoom.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={addRoom}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
      >
        + Tambah Room
      </button>
    </div>
  );
}
