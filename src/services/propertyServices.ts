import useAuthStore from "@/store/useAuthStore";

export interface RoomInput {
  name: string;
  description?: string;
  basePrice: number;
  capacity: number;
  quantity?: number;
}

export interface CreatePropertyInput {
  name: string;
  description: string;
  address: string;
  city: string;
  province: string;
  categoryId?: string;
  categoryName?: string;
  pictures?: (File | string)[];
  rooms?: RoomInput[];
}

function hasFiles(input: CreatePropertyInput): boolean {
  return (
    Array.isArray(input.pictures) &&
    input.pictures.some((p) => p instanceof File)
  );
}

export async function createProperty(input: CreatePropertyInput) {
  const token = useAuthStore.getState().token;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

  if (!token) throw new Error("Unauthorized: Token tidak ditemukan");

  let body: BodyInit;
  let headers: HeadersInit = {
    Authorization: `Bearer ${token}`,
  };

  if (hasFiles(input)) {
    const formData = new FormData();

    if (input.pictures && input.pictures.length > 0) {
      input.pictures.forEach((file) => {
        if (file instanceof File) {
          formData.append("pictures", file);
        } else {
          formData.append("picturesUrl[]", file);
        }
      });
    }

    if (input.rooms && input.rooms.length > 0) {
      input.rooms.forEach((room, i) => {
        Object.entries(room).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            formData.append(`rooms[${i}][${key}]`, String(value));
          }
        });
      });
    }

    Object.entries(input).forEach(([key, value]) => {
      if (key !== "pictures" && key !== "rooms" && value != null) {
        formData.append(key, String(value));
      }
    });

    body = formData;
  } else {
    headers["Content-Type"] = "application/json";
    body = JSON.stringify(input);
  }

  const res = await fetch(`${baseUrl}/api/properties`, {
    method: "POST",
    headers,
    body,
  });

  let data: any;
  try {
    data = await res.json();
  } catch {
    throw new Error("Server tidak memberikan respons JSON yang valid");
  }

  if (!res.ok) {
    throw new Error(data.error || data.message || "Gagal membuat properti");
  }

  return data;
}
