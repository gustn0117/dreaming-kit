"use client";

import { useState, useCallback } from "react";

interface MultiImageUploaderProps {
  value: string[];
  onChange: (urls: string[]) => void;
  folder: string;
}

export default function MultiImageUploader({ value, onChange, folder }: MultiImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const upload = useCallback(async (files: File[]) => {
    setUploading(true);
    const newUrls: string[] = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) newUrls.push(data.url);
    }

    onChange([...value, ...newUrls]);
    setUploading(false);
  }, [folder, onChange, value]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith("image/"));
    if (files.length > 0) upload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) upload(files);
  };

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const move = (from: number, to: number) => {
    if (to < 0 || to >= value.length) return;
    const arr = [...value];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    onChange(arr);
  };

  const inputId = `multi-file-${folder}`;

  return (
    <div>
      <label className="mb-1 block text-xs text-gray-500">상세 이미지</label>

      {/* 이미지 목록 */}
      {value.length > 0 && (
        <div className="mb-3 space-y-2">
          {value.map((url, i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 p-2">
              <img src={url} alt="" className="h-16 w-16 shrink-0 rounded object-cover" />
              <span className="min-w-0 flex-1 truncate text-xs text-gray-500">{url.split("/").pop()}</span>
              <div className="flex shrink-0 gap-1">
                <button type="button" onClick={() => move(i, i - 1)} disabled={i === 0}
                  className="rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-200 disabled:opacity-30">
                  ↑
                </button>
                <button type="button" onClick={() => move(i, i + 1)} disabled={i === value.length - 1}
                  className="rounded px-1.5 py-0.5 text-xs text-gray-400 hover:bg-gray-200 disabled:opacity-30">
                  ↓
                </button>
                <button type="button" onClick={() => remove(i)}
                  className="rounded px-1.5 py-0.5 text-xs text-red-400 hover:bg-red-50 hover:text-red-600">
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 업로드 영역 */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`relative flex min-h-20 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
          dragOver ? "border-gray-900 bg-gray-50" : "border-gray-200 bg-white"
        }`}
        onClick={() => document.getElementById(inputId)?.click()}
      >
        <input
          id={inputId}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        {uploading ? (
          <p className="py-4 text-xs text-gray-400">업로드 중...</p>
        ) : (
          <div className="py-4 text-center">
            <p className="text-xs text-gray-400">드래그 또는 클릭하여 상세 이미지 추가</p>
            <p className="mt-1 text-[10px] text-gray-300">여러 장 선택 가능</p>
          </div>
        )}
      </div>
    </div>
  );
}
