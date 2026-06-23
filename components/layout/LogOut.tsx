import { LogOut } from "lucide-react";

import { logout } from "@/app/register/action";

export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="
          group relative overflow-hidden
          inline-flex items-center gap-2
          rounded-xl
          bg-red-500 px-5 py-2.5
          font-medium text-white
          shadow-md
          transition-all duration-300
          hover:bg-red-600
          hover:shadow-lg hover:shadow-red-500/30
          hover:-translate-y-0.5
          active:translate-y-0
          active:scale-95
          cursor-pointer
        "
      >
        <span
          className="
            absolute inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/20
            to-transparent
            transition-transform duration-700
            group-hover:translate-x-full
          "
        />

        <LogOut
          className="
            h-4 w-4
            transition-transform duration-300
            group-hover:-translate-x-1
          "
        />

        <span
          className="
            transition-transform duration-300
            group-hover:translate-x-0.5
          "
        >
          Logout
        </span>
      </button>
    </form>
  );
}