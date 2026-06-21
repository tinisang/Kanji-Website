"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { auth } from "@/auth";

export default function LoginPage() {
    const router = useRouter();
    

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(
  e: React.FormEvent
) {
  e.preventDefault();

  const result = await signIn(
    "credentials",
    {
      email,
      password,
      redirect: false,
    }
  );

  if (result?.error) {
    setError(
      "Sai tài khoản hoặc mật khẩu"
    );
    return;
  }

  router.push("/");
}

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="hidden lg:flex flex-col justify-center bg-[#D8E88D] p-12">
          <span className="text-sm uppercase tracking-[0.3em] text-neutral-700">
            Website Kanji
          </span>

          <h1 className="mt-4 text-5xl font-semibold leading-tight">
            Chào mừng
            <br />
            quay trở lại
          </h1>

          <p className="mt-6 text-neutral-700 text-lg">
            Tiếp tục hành trình học Kanji của bạn.
          </p>

          <div className="mt-10 text-7xl">漢字</div>
        </div>

        <div className="p-10 lg:p-14">
          <div className="max-w-md mx-auto">
            <h2 className="text-3xl font-semibold">
              Đăng nhập
            </h2>

            <p className="mt-2 text-neutral-500">
              Nhập thông tin tài khoản của bạn.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-[#B9D44E]"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Mật khẩu
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-[#B9D44E]"
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-black text-white font-medium hover:opacity-90 transition"
              >
                Đăng nhập
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-neutral-500">
              Chưa có tài khoản?{" "}
              <a
                href="/register"
                className="font-medium text-black"
              >
                Đăng ký
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}