"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";

export function PaginationComponent(
  {
    totalPages,
    currentPage
  }: {
    totalPages: number;
    currentPage: number;
  }
) {
  const t = useTranslations('Pagination');

  const router = useRouter();
  const searchParams = useSearchParams();
  
  const generatePaginationLinks = () => {
    const paginationLinks = [];
    const leftEllipsis = currentPage > 2 && totalPages > 3;
    const rightEllipsis = currentPage < totalPages - 1 && totalPages > 3;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        paginationLinks.push(
          <PaginationLink
            key={i}
            onClick={() => changePage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        );
      }
    }

    if (leftEllipsis) {
      paginationLinks.splice(1, 0, <PaginationEllipsis key="left" />);
    }
    if (rightEllipsis) {
      paginationLinks.splice(
        paginationLinks.length - 1,
        0,
        <PaginationEllipsis key="right" />
      );
    }

    return paginationLinks;
  };

  if (totalPages <= 1) return null;

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };
  
  return (
    <Pagination>
      <PaginationContent className=" *:cursor-pointer">
        <Button
          variant="ghost"
          disabled={currentPage <= 1}
          onClick={() => changePage(currentPage - 1)}
          className="group"
        >
          <ChevronLeft className="group-hover:-translate-x-1 transition-all duration-300 delay-150" />{" "}
          {t('previous')}
        </Button>
        {generatePaginationLinks()}
        <Button
          variant="ghost"
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
          className="group"
        >
          {t('next')} {" "}
          <ChevronRight className="group-hover:translate-x-1 transition-all duration-300 delay-150" />
        </Button>
      </PaginationContent>
    </Pagination>
  );
}
