"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface ArtistRow {
  id: string;
  name: string;
  name_en: string;
  image: string;
  description: string;
  instagram: string | null;
  website: string | null;
  sort_order: number;
  is_visible: boolean;
}

const emptyForm = {
  name: "",
  nameEn: "",
  image: "",
  description: "",
  instagram: "",
  website: "",
};

export default function AdminArtistsPage() {
  const [artists, setArtists] = useState<ArtistRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchArtists = async () => {
    const res = await fetch("/api/admin/artists");
    if (res.ok) setArtists(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchArtists(); }, []);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (a: ArtistRow) => {
    setEditId(a.id);
    setForm({
      name: a.name,
      nameEn: a.name_en,
      image: a.image,
      description: a.description,
      instagram: a.instagram || "",
      website: a.website || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;

    await fetch("/api/admin/artists", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setShowModal(false);
    setSaving(false);
    fetchArtists();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch("/api/admin/artists", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchArtists();
  };

  const toggleVisibility = async (a: ArtistRow) => {
    await fetch("/api/admin/artists", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: a.id,
        name: a.name,
        nameEn: a.name_en,
        image: a.image,
        description: a.description,
        instagram: a.instagram,
        website: a.website,
        isVisible: !a.is_visible,
        sortOrder: a.sort_order,
      }),
    });
    fetchArtists();
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">로딩 중...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">아티스트 관리</h1>
        <button onClick={openCreate} className="rounded-md bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-black">
          + 아티스트 추가
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">이미지</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">이름</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">소개</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500">상태</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">관리</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((a) => (
              <tr key={a.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3">
                  {a.image ? (
                    <img src={a.image} alt="" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-100" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{a.name}</p>
                  <p className="text-xs text-gray-400">{a.name_en}</p>
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-gray-600">{a.description}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleVisibility(a)}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      a.is_visible ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {a.is_visible ? "공개" : "숨김"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(a)} className="mr-2 text-xs text-gray-500 hover:text-gray-900">수정</button>
                  <button onClick={() => handleDelete(a.id)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
                </td>
              </tr>
            ))}
            {artists.length === 0 && (
              <tr>
                <td colSpan={5} className="py-12 text-center text-sm text-gray-400">등록된 아티스트가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-6 text-lg font-semibold">{editId ? "아티스트 수정" : "아티스트 추가"}</h2>

            <div className="space-y-4">
              <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="artists" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">이름 (한글)</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">이름 (영문)</label>
                  <input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-500">소개글</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Instagram</label>
                  <input value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                    placeholder="@username"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">Website</label>
                  <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                    placeholder="https://"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 rounded-md border border-gray-200 py-2.5 text-sm text-gray-600 hover:bg-gray-50">취소</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 rounded-md bg-gray-900 py-2.5 text-sm text-white hover:bg-black disabled:opacity-50">
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
