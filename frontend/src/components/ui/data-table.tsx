"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  Table as TableType,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  readonly columns: ColumnDef<TData, TValue>[];
  readonly data: TData[];
  readonly pageCount: number;
  readonly currentPage: number;
  readonly perPage: number;
}

interface DataTablePaginationProps<TData> {
  table: TableType<TData>;
}

export function DataTablePagination<TData>({
  table,
}: Readonly<DataTablePaginationProps<TData>>) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageSize = table.getState().pagination.pageSize;

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center justify-between flex-1 space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const params = new URLSearchParams(window.location.search);
              params.set("perPage", value);
              params.set("currentPage", "1");
              window.location.search = params.toString();
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {pageIndex + 1} of {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              asChild
              disabled={!table.getCanPreviousPage()}
            >
              <Link href={`?currentPage=1&perPage=${pageSize}`}>
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              asChild
              disabled={!table.getCanPreviousPage()}
            >
              <Link href={`?currentPage=${pageIndex}&perPage=${pageSize}`}>
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              asChild
              disabled={!table.getCanNextPage()}
            >
              <Link href={`?currentPage=${pageIndex + 2}&perPage=${pageSize}`}>
                <span className="sr-only">Go to next page</span>
                <ChevronRight />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              asChild
              disabled={!table.getCanNextPage()}
            >
              <Link
                href={`?currentPage=${table.getPageCount()}&perPage=${pageSize}`}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  currentPage,
  perPage,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize: perPage,
      },
    },
    manualPagination: true, // Enable server-side pagination
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="border border-gray-light">
        <Table>
          <TableHeader className="bg-black-primary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={
                      (
                        header.column.columnDef.meta as {
                          style?: React.CSSProperties;
                        }
                      )?.style
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="bg-gray-medium">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
