"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "@/lib/api/uploads";

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadImage,
  });
}
