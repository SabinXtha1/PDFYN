"use server"

import { signIn } from "@/auth"

export async function signInWithGitHub() {
  return signIn("github")
}
