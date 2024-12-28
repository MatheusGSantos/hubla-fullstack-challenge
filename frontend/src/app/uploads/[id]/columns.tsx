"use client";

import { Transaction } from "@/interfaces/Transaction";
import { ColumnDef } from "@tanstack/react-table";
import clsx from "clsx";
import { DollarSign, HandCoins } from "lucide-react";

const formatType = (type: number) => {
  switch (type) {
    case 1:
      return "Producer Selling";
    case 2:
      return "Affiliate Selling";
    case 3:
      return "Affiliate Commission";
    case 4:
      return "Comission Received";
    default:
      return undefined;
  }
};

export const TABLE_COLUMNS: ColumnDef<Transaction>[] = [
  {
    header: "Type",
    accessorKey: "type",
    cell: ({ row }) => {
      const type = row.getValue("type") as number;
      const formatted = formatType(type);
      let Icon = null;

      switch (type) {
        case 1:
        case 2:
          Icon = <DollarSign className="w-3 h-3 text-green-secondary" />;
          break;
        case 3:
          Icon = <HandCoins className="w-3 h-3 text-red-600" />;
          break;
        case 4:
          Icon = <DollarSign className="w-3 h-3 text-yellow-600" />;
          break;
      }

      return (
        <div
          className={clsx(
            "rounded-full py-1 px-2 w-[160px] flex gap-0.5 items-center",
            !formatted && "bg-purple-primary text-purple-900",
            type < 3 && "bg-green-50 text-green-600",
            type === 3 && "bg-red-50 text-red-600",
            type === 4 && "bg-yellow-50 text-yellow-600",
          )}
        >
          {Icon}
          <span className="font-semibold text-xs text-center flex-1">
            {formatted ?? "Unknown"}
          </span>
        </div>
      );
    },
  },
  {
    header: "Timestamp",
    accessorKey: "timestamp",
    cell: ({ row }) => {
      const timestamp = new Date(row.getValue("timestamp"));
      const formatted = `${timestamp.toLocaleDateString("pt-br")} ${timestamp.toLocaleTimeString("pt-br")}`;

      return <div>{formatted}</div>;
    },
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Value",
    accessorKey: "value",
    cell: ({ row }) => {
      const value = row.getValue("value") as number;
      const type = row.getValue("type") as number;
      const operation = {
        sign: "",
        color: "",
      };

      if (type === 3) {
        operation.sign = "-";
        operation.color = "text-red-400";
      } else if (type > 0 && type < 5) {
        operation.sign = "+";
        operation.color = "text-green-400";
      }

      // value is in cents, transform to dollars and format to 2 decimal places
      const formatted = `${operation.sign} $ ${(value / 100).toFixed(2)}`;

      return <span className={operation.color}>{formatted}</span>;
    },
  },
  {
    header: "Seller",
    accessorKey: "seller",
  },
];
