import ky from "ky";

export const api = ky.create({
  prefixUrl: "http://localhost:8000",
  // hooks: {
  //   beforeRequest: [
  //     (request) => {
  //       const cookiesStore = cookies();

  //       const token = cookiesStore.get("token")?.value;

  //       if (token) {
  //         request.headers.set("Authorization", `Bearer ${token}`);
  //       }
  //     },
  //   ],
  // },
});
