import React from "react"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { cn } from "@/libs/utils"

type MainPaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  getHref?: (page: number) => string
  className?: string
}

const createPageList = (current: number, total: number) => {
  const pages: (number | "ellipsis")[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  const showLeft = Math.max(2, current - 1)
  const showRight = Math.min(total - 1, current + 1)

  pages.push(1)

  if (showLeft > 2) {
    pages.push("ellipsis")
  }

  for (let i = showLeft; i <= showRight; i++) {
    pages.push(i)
  }

  if (showRight < total - 1) {
    pages.push("ellipsis")
  }

  pages.push(total)

  return pages
}

const MainPagination: React.FC<MainPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  getHref,
  className,
}) => {
  if (totalPages <= 1) return null

  const pages = createPageList(currentPage, totalPages)

  const handleChange = (page: number) => {
    if (page < 1 || page > totalPages || page === currentPage) return
    onPageChange?.(page)
  }

  const buildHref = (page: number) =>
    getHref ? getHref(page) : "#"

  const isFirst = currentPage === 1
  const isLast = currentPage === totalPages

  return (
    <Pagination className={cn("mt-6", className)}>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            href={buildHref(currentPage - 1)}
            aria-disabled={isFirst}
            tabIndex={isFirst ? -1 : 0}
            className={cn(
              isFirst && "pointer-events-none opacity-50"
            )}
            onClick={(e) => {
              if (isFirst) return
              if (onPageChange) {
                e.preventDefault()
                handleChange(currentPage - 1)
              }
            }}
          />
        </PaginationItem>

        {/* Pages */}
        {pages.map((p, index) =>
          p === "ellipsis" ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href={buildHref(p)}
                isActive={p === currentPage}
                onClick={(e) => {
                  if (onPageChange) {
                    e.preventDefault()
                    handleChange(p)
                  }
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href={buildHref(currentPage + 1)}
            aria-disabled={isLast}
            tabIndex={isLast ? -1 : 0}
            className={cn(
              isLast && "pointer-events-none opacity-50"
            )}
            onClick={(e) => {
              if (isLast) return
              if (onPageChange) {
                e.preventDefault()
                handleChange(currentPage + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default MainPagination