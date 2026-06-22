import { logout } from "@/app/features/auth/register/action";


export function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="px-4 py-2 rounded-lg border"
      >
        Logout
      </button>
    </form>
  );
}