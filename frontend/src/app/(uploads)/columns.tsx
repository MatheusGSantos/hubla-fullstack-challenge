"use client";

import { Upload } from "@/interfaces/Upload";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import Link from "next/link";

export const TABLE_COLUMNS: ColumnDef<Upload>[] = [
  { header: "ID", accessorKey: "id", size: 50 },
  {
    header: "File Name",
    accessorKey: "filename",
  },
  {
    header: "Uploaded at",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const formatted = `${createdAt.toLocaleDateString("pt-br")} ${createdAt.toLocaleTimeString("pt-br")}`;

      return <div>{formatted}</div>;
    },
  },
  {
    header: "Actions",
    meta: {
      style: {
        textAlign: "right",
        paddingRight: "1rem",
      },
    },
    size: 50,
    cell: ({ row }) => {
      const id = row.getValue("id");

      return (
        <div className="flex justify-end pr-5">
          <Link className="group" href={`/uploads/${id}`}>
            <Eye className="group-hover:text-purple-primary" />
          </Link>
        </div>
      );
    },
  },
];
