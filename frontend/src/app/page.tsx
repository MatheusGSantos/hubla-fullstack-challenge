import { redirect, RedirectType } from "next/navigation";
export default function Root() {
  redirect("/uploads", RedirectType.replace);
}
