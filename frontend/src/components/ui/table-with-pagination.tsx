/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Meta } from "@/interfaces/Meta";

interface TableWithPaginationProps<T extends Record<string, any>> {
  columns: ReadonlyArray<{
    label: string;
    className?: string;
    transform?: (value: any) => string;
  }>;
  data: ReadonlyArray<T>;
  meta: Meta;
}

const RANGE_VALUE = 4;

const TablePagination: React.FC<{ meta: Meta }> = ({ meta }) => {
  const { currentPage, lastPage, next, prev } = meta;
  const paginationStart =
    currentPage - RANGE_VALUE > 0 ? currentPage - RANGE_VALUE : 1;
  const paginationEnd =
    currentPage + RANGE_VALUE < lastPage ? currentPage + RANGE_VALUE : lastPage;

  const createPageLinks = () => {
    const links = [];
    for (let i = 1; i <= lastPage; i++) {
      if (i < paginationStart) {
        continue;
      }

      if (i > paginationEnd) {
        break;
      }

      links.push(
        <PaginationItem key={i}>
          <PaginationLink
            href={`?currentPage=${i}`}
            isActive={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return links;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?currentPage=${prev}`} />
        </PaginationItem>
        {currentPage > RANGE_VALUE && <PaginationEllipsis />}
        {createPageLinks()}
        {currentPage + RANGE_VALUE < lastPage && <PaginationEllipsis />}
        <PaginationItem>
          <PaginationNext href={`?currentPage=${next}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export function TableWithPagination<T extends Record<string, any>>({
  columns,
  data,
  meta,
}: Readonly<TableWithPaginationProps<T>>) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.label} className={column.className}>
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => {
            return (
              <TableRow key={crypto.randomUUID()}>
                {Object.values(row).map((cellValue, index) => (
                  <TableCell key={crypto.randomUUID()}>
                    {columns[index]?.transform
                      ? columns[index].transform(cellValue)
                      : cellValue}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination meta={meta} />
    </>
  );
}
