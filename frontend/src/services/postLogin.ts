// lib/auth.ts
import { api } from "@/lib/api";

interface Payload {
  email: string;
  password: string;
}

export async function postLogin({ email, password }: Payload): Promise<void> {
  await api
    .post("auth/login", {
      json: { email, password },
    })
    .json();

  await new Promise((resolve) => setTimeout(resolve, 1000));
}
