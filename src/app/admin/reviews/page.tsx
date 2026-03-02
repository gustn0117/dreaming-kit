"use client";

import { useState, useEffect } from "react";

interface ReviewRow {
  id: string;
  product_id: string;
  nickname: string;
  user_id: string;
  date: string;
  rating: number;
  content: string;
  products?: { name_en: string };
}

interface ProductOption {
  id: string;
  name_en: string;
}

const emptyForm = {
  productId: "",
  nickname: "",
  userId: "",
  date: "",
  rating: 5,
  content: "",
};

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<ReviewRow[]>([]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchReviews = async () => {
    const res = await fetch("/api/admin/reviews");
    if (res.ok) setReviews(await res.json());
    setLoading(false);
  };

  const fetchProducts = async () => {
    const res = await fetch("/api/admin/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data.map((p: { id: string; name_en: string }) => ({ id: p.id, name_en: p.name_en })));
    }
  };

  useEffect(() => { fetchReviews(); fetchProducts(); }, []);

  const openCreate = () => {
    setForm(emptyForm);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/admin/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setShowModal(false);
    setSaving(false);
    fetchReviews();
  };

  const handleDelete = async (review: ReviewRow) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await fetch("/api/admin/reviews", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: review.id, productId: review.product_id }),
    });
    fetchReviews();
  };

  if (loading) return <div className="py-20 text-center text-sm text-gray-400">로딩 중...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">리뷰 관리</h1>
        <button onClick={openCreate} className="rounded-md bg-gray-900 px-4 py-2 text-xs font-medium text-white hover:bg-black">
          + 리뷰 추가
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">상품</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">작성자</th>
              <th className="px-4 py-3 text-center font-medium text-gray-500">별점</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">내용</th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">날짜</th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">관리</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((r) => (
              <tr key={r.id} className="border-b border-gray-50 last:border-0">
                <td className="px-4 py-3 text-gray-600">{r.products?.name_en || "-"}</td>
                <td className="px-4 py-3">
                  <p className="font-medium text-gray-900">{r.nickname}</p>
                  <p className="text-xs text-gray-400">{r.user_id}</p>
                </td>
                <td className="px-4 py-3 text-center">
                  {"★".repeat(r.rating)}
                  <span className="text-gray-200">{"★".repeat(5 - r.rating)}</span>
                </td>
                <td className="max-w-xs truncate px-4 py-3 text-gray-600">{r.content}</td>
                <td className="px-4 py-3 text-gray-400">{r.date}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(r)} className="text-xs text-red-400 hover:text-red-600">삭제</button>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-gray-400">등록된 리뷰가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowModal(false)}>
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="mb-6 text-lg font-semibold">리뷰 추가</h2>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs text-gray-500">상품 선택</label>
                <select value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400">
                  <option value="">선택하세요</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name_en}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">닉네임</label>
                  <input value={form.nickname} onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">아이디</label>
                  <input value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs text-gray-500">날짜</label>
                  <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    placeholder="2025.03.15"
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
                </div>
                <div>
                  <label className="mb-1 block text-xs text-gray-500">별점</label>
                  <select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400">
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{"★".repeat(r)} ({r}점)</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs text-gray-500">리뷰 내용</label>
                <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400" />
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
