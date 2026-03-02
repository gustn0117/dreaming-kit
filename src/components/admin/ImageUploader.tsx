"use client";

import { useState, useCallback } from "react";

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  folder: string;
}

export default function ImageUploader({ value, onChange, folder }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const upload = useCallback(async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (res.ok) {
      onChange(data.url);
    }
    setUploading(false);
  }, [folder, onChange]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) upload(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`relative flex min-h-32 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed transition-colors ${
        dragOver ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white"
      }`}
      onClick={() => document.getElementById(`file-${folder}`)?.click()}
    >
      <input
        id={`file-${folder}`}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {uploading ? (
        <p className="text-xs text-gray-400">업로드 중...</p>
      ) : value ? (
        <img src={value} alt="" className="h-40 w-full object-contain" />
      ) : (
        <div className="py-6 text-center">
          <svg className="mx-auto h-8 w-8 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path d="M12 16V4m0 0L8 8m4-4l4 4M4 20h16" />
          </svg>
          <p className="mt-2 text-xs text-gray-400">드래그 또는 클릭하여 업로드</p>
        </div>
      )}
    </div>
  );
}
