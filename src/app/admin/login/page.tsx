"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin/products");
    } else {
      setError("비밀번호가 틀렸습니다.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6 text-center">
        <div>
          <h1
            className="text-2xl text-gray-800"
            style={{ fontFamily: "var(--font-family-display)", fontStyle: "italic" }}
          >
            Admin
          </h1>
          <p className="mt-2 text-xs text-gray-400">관리자 비밀번호를 입력하세요</p>
        </div>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full border-b border-gray-200 bg-transparent py-3 text-center text-sm outline-none transition-colors focus:border-gray-900"
          autoFocus
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-900 py-3 text-xs font-medium uppercase tracking-widest text-white transition-colors hover:bg-black disabled:opacity-50"
        >
          {loading ? "..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
