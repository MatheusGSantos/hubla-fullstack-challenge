// lib/auth.ts
import { api } from "@/lib/api";

// Login Function
export async function login(email: string, password: string): Promise<void> {
  try {
    await api.post("auth/login", {
      json: { email, password },
    });
  } catch (error) {
    console.error("Login failed:", error);
  }
}

// Logout Function
export async function logout(): Promise<void> {
  try {
    await api.post("auth/logout");
    window.location.href = "/login"; // Redirect after logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
