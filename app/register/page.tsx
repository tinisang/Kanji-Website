"use client";

import router from "next/router";
import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (data.success) {
                // router.push("/login");
                setMessage("ngon")
                window.location.href = "/login";
                
            } else {
                setMessage("Đăng ký thất bại");
            }
        } catch {
            setMessage("Có lỗi xảy ra");
        }
    }

    return (
        <div className="min-h-screen  flex items-center justify-center p-6">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">

                {/* Left */}
                <div className="hidden lg:flex flex-col justify-center bg-[#D8E88D] p-12">
                    <span className="text-sm uppercase tracking-[0.3em] text-neutral-700">
                        Website Kanji
                    </span>

                    <h1 className="mt-4 text-5xl font-bold leading-tight">
                        Học Kanji
                        <br />
                        theo nhóm
                    </h1>

                    <p className="mt-6 text-neutral-700 text-lg">
                        Quản lý, phân loại và ghi nhớ Kanji dễ dàng hơn.
                    </p>

                    <div className="mt-10 text-7xl">
                        日本語
                    </div>
                </div>

                {/* Right */}
                <div className="p-10 lg:p-14">
                    <div className="max-w-md mx-auto">
                        <h2 className="text-3xl font-semibold">
                            Tạo tài khoản
                        </h2>

                        <p className="mt-2 text-neutral-500">
                            Bắt đầu xây dựng kho Kanji của riêng bạn.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-medium">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 rounded-xl border px-4 outline-none focus:ring-2 focus:ring-[#B9D44E]"
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
                                />
                            </div>

                            <button
                                className="
              w-full
              h-12
              rounded-xl
              bg-black
              text-white
              font-medium
              transition
              hover:scale-[1.02]
            "
                            >
                                Đăng ký
                            </button>
                            {message && (
                                <p className="text-sm">
                                    {message}
                                </p>
                            )}
                        </form>

                        <p className="mt-6 text-center text-sm text-neutral-500">
                            Đã có tài khoản?{" "}
                            <a href="/login" className="font-medium text-black">
                                Đăng nhập
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}