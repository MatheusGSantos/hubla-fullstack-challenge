"use client";
import { History, LogOut, Upload } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HIDE_IN_PATHS = ["/login", "/signup"];

export function Header() {
  const pathname = usePathname();
  if (HIDE_IN_PATHS.includes(pathname)) {
    return null;
  }

  return (
    <header className="w-full flex bg-black-primary items-center sticky top-0 z-50 py-3 px-8">
      <ul className="flex gap-4 w-full justify-end">
        <li>
          <Link
            className="flex items-center gap-2 hover:text-white/70 transition-colors"
            href="/uploads"
          >
            <History size={20} />
            Uploads
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center gap-2 hover:text-white/70 transition-colors"
            href="/uploads"
          >
            <Upload size={20} />
            Upload File
          </Link>
        </li>
        <li>
          <Link
            className="text-red-300 flex items-center gap-2 hover:text-red-400 transition-colors"
            href="/api/auth/signout"
          >
            {" "}
            <LogOut size={20} />
            Logout
          </Link>
        </li>
      </ul>
    </header>
  );
}
