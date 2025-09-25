// components/PackageList.tsx
import PackageCard from "./PackageCard";
import { searchServicePackages } from "@/api/service/api";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page?: number; 
  size?: number;
};

export default async function PackageList({ page = 1, size = 6 }: Props) {
  const { content, totalPages, page: currentPage } = await searchServicePackages(
    { page, size, sortBy: "createdAt", sortDir: "desc" }
  );

  return (
    <div className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((p) => (
          <PackageCard key={p.id} p={p} />
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            {/* Prev */}
            <PaginationItem>
              <PaginationPrevious
                href={currentPage > 1 ? `?page=${currentPage - 1}&size=${size}` : "#"}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, i) => {
              const n = i + 1;
              const isEdge =
                n <= 2 || n > totalPages - 2 || Math.abs(n - currentPage) <= 1;
              if (!isEdge) {
                // chỉ render một Ellipsis cho các khoảng trống
                if (
                  (n === 3 && currentPage > 4) ||
                  (n === totalPages - 2 && currentPage < totalPages - 3)
                ) {
                  return (
                    <PaginationItem key={`ellipsis-${n}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                return null;
              }
              return (
                <PaginationItem key={n}>
                  <PaginationLink
                    href={`?page=${n}&size=${size}`}
                    isActive={n === currentPage}
                  >
                    {n}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {/* Next */}
            <PaginationItem>
              <PaginationNext
                href={
                  currentPage < totalPages ? `?page=${currentPage + 1}&size=${size}` : "#"
                }
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
