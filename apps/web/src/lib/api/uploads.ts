import { apiClient } from "@/lib/api/client";

export async function uploadImage(file: File) {
  const form = new FormData();
  form.append("file", file);
  try {
    const { data } = await apiClient.post<{ url: string }>("/uploads", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data.url;
  } catch (error) {
    console.warn("[uploadImage] API indisponible, fallback data URL.", error);
    return await fileToDataUrl(file);
  }
}

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
