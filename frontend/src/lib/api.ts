import ky from "ky";
import { getCookie } from "cookies-next";
import type { CookiesFn } from "cookies-next/lib/types";

export const api = ky.create({
  prefixUrl: "http://localhost:8000",
  credentials: "include",
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
  },
});
