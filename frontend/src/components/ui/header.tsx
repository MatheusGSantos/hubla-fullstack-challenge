"use client";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDE_IN_PATHS = ["/login", "/signup"];

export function Header() {
  const pathname = usePathname();
  if (HIDE_IN_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <div className="w-full flex bg-black-primary items-center justify-end sticky top-0 z-50 py-3 px-8">
      <ul>
        <li>
          <Link
            className="text-red-300 flex items-center gap-2"
            href="/api/auth/signout"
          >
            {" "}
            <LogOut size={20} />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
