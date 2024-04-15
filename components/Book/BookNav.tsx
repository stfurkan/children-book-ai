import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { PageType } from '@/types/dbTypes';

export function BookNav({ bookId, pages }: { bookId: string; pages: PageType[] }) {
  const t = useTranslations('BookNav');

  return (
    <nav className="grid gap-4 text-sm text-muted-foreground w-full">
      <ScrollArea className="h-72 w-full md:w-48 rounded-md border">
        <div className="p-4">
          <h4 className="mb-4 text-base font-semibold leading-none text-slate-800">{t('content')}</h4>
          <Link
            href={`/book/${bookId}/summary`}
          >
            <Button
              variant="unset"
              size="unset"
              className="hover:text-primary underline-offset-4 hover:underline"
            >
              {t('summary')}
            </Button>
          </Link>
          <Separator className="my-2" />
          {pages.map((page) => (
            <div key={page.id}>
              <Link href={`/book/${bookId}/read?page=${page.pageNumber}`}>
                <Button
                  variant="unset"
                  size="unset"
                  className="hover:text-primary underline-offset-4 hover:underline"
                >
                  {t('page', { page: page.pageNumber})}
                </Button>
              </Link>
              <Separator className="my-2" />
            </div>
          ))}
        </div>
      </ScrollArea>
    </nav>
  );
}
