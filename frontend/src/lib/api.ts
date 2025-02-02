import ky from "ky";
import { getCookie } from "cookies-next";
import type { CookiesFn } from "cookies-next/lib/types";
import { redirect } from "next/navigation";

export const api = ky.create({
  prefixUrl: "http://localhost:8000",
  credentials: "include",
  cache: "no-store",
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookiesStore: CookiesFn | undefined;

        if (typeof window === "undefined") {
          const { cookies: serverCookies } = await import("next/headers");

          cookiesStore = serverCookies;
        }

        const token = getCookie("jwt", { cookies: cookiesStore });

        if (token) {
          request.headers.set("Cookie", `jwt=${token}`);
        }
      },
    ],
    afterResponse: [
      async (req, opt, res) => {
        const response = await res.json<{ message: string | undefined }>();
        if (
          res.status === 401 &&
          response?.message?.includes("Invalid credentials")
        ) {
          if (typeof window !== "undefined") {
            window.location.href = "/api/auth/signout";
          } else {
            redirect("/api/auth/signout");
          }
        }
      },
    ],
  },
});
