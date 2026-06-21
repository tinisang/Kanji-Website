"use server";

import { signOut } from "@/auth";
import { createUser } from "@/lib/auth/user.actions";

export async function registerAction(
  formData: FormData
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await createUser(email, password);
}




export async function logout() {
  await signOut({
    redirectTo: "/login",
  });
}