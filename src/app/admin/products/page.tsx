"use client";

import { useState, useEffect } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

interface ProductRow {
  id: string;
  name: string;
  name_en: string;
  price: number;
  image: string;
  artist: string;
  manufacturer: string;
  release_date: string;
  country: string;
  description: string | null;
  sort_order: number;
  is_visible: boolean;
}

const emptyForm = {
  name: "",
  nameEn: "",
  price: 0,
  image: "",
  artist: "",
  manufacturer: "",
  releaseDate: "",
  country: "대한민국",
  description: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    if (res.ok) setProducts(await res.json());
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEdit = (p: ProductRow) => {
    setEditId(p.id);
    setForm({
      name: p.name,
      nameEn: p.name_en,
      price: p.price,
      image: p.image,
      artist: p.artist,
      manufacturer: p.manufacturer,
      releaseDate: p.release_date,
      country: p.country,
      description: p.description || "",
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const method = editId ? "PUT" : "POST";
    const body = editId ? { ...form, id: editId } : form;

    await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setShowModal(false);
    setSaving(false);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch("/api/admin/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchProducts();
  };

  const toggleVisibility = async (p: ProductRow) => {
    await fetch("/api/admin/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: p.id,
        name: p.name,
        nameEn: p.name_en,
        price: p.price,
        image: p.image,
        artist: p.artist,
        manufacturer: p.manufacturer,
        releaseDate: p.release_date,
        country: p.country,
        description: p.description,
        isVisible: !p.is_visible,
        sortOrder: p.sort_order,
      }),
    });
    fetchProducts();
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">로딩 중...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">상품 관리</h1>
        <button
          onClick={openCreate}
          className="rounded-md bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-black"
        >
          + 상품 추가
        </button>
      </div>

      {/* 테이블 */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">이미지</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">상품명</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">아티스트</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">가격</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500">상태</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">관리</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3">
                  {p.image ? (
                    <img src={p.image} alt="" className="h-10 w-10 rounded object-cover" />
                  ) : (
                    <div className="h-10 w-10 rounded bg-gray-100" />
                  )}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{p.name_en}</p>
                  <p className="text-xs text-gray-400">{p.name}</p>
                </td>
                <td className="px-4 py-3 text-gray-600">{p.artist}</td>
                <td className="px-4 py-3 text-right tabular-nums text-gray-600">
                  {p.price.toLocaleString()}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleVisibility(p)}
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium ${
                      p.is_visible
                        ? "bg-green-50 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {p.is_visible ? "공개" : "숨김"}
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p)} className="mr-2 text-xs text-gray-500 hover:text-gray-900">
                    수정
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs text-red-400 hover:text-red-600">
                    삭제
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-gray-400">
                  등록된 상품이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 모달 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-6 text-lg font-semibold">{editId ? "상품 수정" : "상품 추가"}</h2>

            <div className="space-y-4">
              <ImageUploader value={form.image} onChange={(url) => setForm({ ...form, image: url })} folder="products" />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">상품명 (한글)</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">상품명 (영문)</label>
                  <input value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">가격 (원)</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">아티스트</label>
                  <input value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">제작사</label>
                  <input value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">발매일</label>
                  <input value={form.releaseDate} onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
                    placeholder="2025.03.01"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-500">제조국</label>
                <input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-500">상품 설명 (선택)</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 rounded-md border border-gray-200 py-2.5 text-sm text-gray-600 hover:bg-gray-50">
                취소
              </button>
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
