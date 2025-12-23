"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { useCreatePost } from "@/hooks/use-create-post";
import { useUploadImage } from "@/hooks/use-upload-image";
import Image from "next/image";

export function PostComposer() {
  const [value, setValue] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const createPost = useCreatePost();
  const uploadImage = useUploadImage();

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const submit = async () => {
    if (!value.trim()) return;
    let imageUrl: string | undefined;
    if (selectedFile) {
      imageUrl = await uploadImage.mutateAsync(selectedFile);
    }
    await createPost.mutateAsync({
      message: value,
      imageUrl,
    });
    setValue("");
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit();
  };

  return (
    <motion.form
      layout
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-800 dark:bg-slate-900"
    >
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
        Partager une mise à jour
      </p>
      <textarea
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="mt-4 w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-base text-slate-900 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
        placeholder="Raconte une victoire produit, un apprentissage ou une initiative culture…"
        rows={4}
      />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <label className="cursor-pointer text-sm font-medium text-brand">
          <input
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFile}
          />
          {selectedFile ? "Modifier la pièce jointe" : "Ajouter une image"}
        </label>
        <Button
          disabled={!value.trim() || createPost.isPending}
          type="submit"
        >
          {createPost.isPending ? "Publication..." : "Publier"}
        </Button>
      </div>
      {preview && (
        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
          <Image
            src={preview}
            alt="aperçu"
            width={800}
            height={400}
            className="max-h-60 w-full object-cover"
          />
        </div>
      )}
    </motion.form>
  );
}
