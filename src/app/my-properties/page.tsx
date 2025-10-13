"use client";

import { useEffect, useState } from "react";
import { getMyProperties, createAvailability } from "@/hooks/useMyProperties";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import CardBox from "@/components/ui/cardbox";

interface Room {
  id: string;
  name: string;
  basePrice: number;
  capacity: number;
}

interface Property {
  id: string;
  name: string;
  city: string;
  province: string;
  rooms: Room[];
}

interface FormState {
  date: string;
  availability: number;
}

export default function MyPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [formState, setFormState] = useState<Record<string, FormState>>({});
  const [submitting, setSubmitting] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyProperties();
        if (Array.isArray(data)) {
          setProperties(data);
        } else {
          console.warn("Data properties bukan array:", data);
          setProperties([]);
        }
      } catch (e) {
        console.error(e);
        setProperties([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleChange = (
    roomId: string,
    field: keyof FormState,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState((prev) => ({
      ...prev,
      [roomId]: { ...prev[roomId], [field]: e.target.value },
    }));
  };

  const handleSubmit = async (roomId: string) => {
    const form = formState[roomId];
    if (!form?.date || !form?.availability) {
      return alert("Lengkapi tanggal dan jumlah tersedia.");
    }

    try {
      setSubmitting((prev) => ({ ...prev, [roomId]: true }));
      await createAvailability(roomId, form.date, Number(form.availability));
      alert("Availability berhasil ditambahkan!");
      setFormState((prev) => ({
        ...prev,
        [roomId]: { date: "", availability: 0 },
      }));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSubmitting((prev) => ({ ...prev, [roomId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        <Loader2 className="animate-spin mr-2" /> Memuat properti...
      </div>
    );
  }

  if (!properties.length) {
    return (
      <p className="text-center text-gray-600 mt-10">
        Kamu belum memiliki properti.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold mb-4">My Properties</h1>

      {properties.map((property) => (
        <CardBox key={property.id} maxWidth="full" className="p-5">
          <h2 className="text-lg font-semibold mb-2">{property.name}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {property.city}, {property.province}
          </p>

          <div className="space-y-4">
            {Array.isArray(property.rooms) &&
              property.rooms.map((room) => (
                <div
                  key={room.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <h3 className="font-medium">{room.name}</h3>
                  <p className="text-sm text-gray-500">
                    Kapasitas: {room.capacity} | Harga dasar: Rp{room.basePrice}
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <Input
                      type="date"
                      value={formState[room.id]?.date || ""}
                      onChange={(e) => handleChange(room.id, "date", e)}
                    />
                    <Input
                      type="number"
                      placeholder="Jumlah tersedia"
                      value={formState[room.id]?.availability || ""}
                      onChange={(e) => handleChange(room.id, "availability", e)}
                    />
                    <Button
                      disabled={submitting[room.id]}
                      onClick={() => handleSubmit(room.id)}
                    >
                      {submitting[room.id] ? "Menyimpan..." : "Tambah"}
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardBox>
      ))}
    </div>
  );
}
