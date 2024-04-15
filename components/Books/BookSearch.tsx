'use client';
import React, { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Search, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function BookSearch() {
  const t = useTranslations('AllBooks');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');

  const handleSearch = (e: any) => {
    e.preventDefault();

    const searchParams = new URLSearchParams();
    searchParams.set('search', search);

    if (search === '') {
      searchParams.delete('search');
    }

    router.push(`${pathname}?${searchParams.toString()}`);
  }

  const handleClear = () => {
    setSearch('');
    router.push(pathname);
  }

  return (
    <div className="flex flex-col items-end">
      {searchParams.get('search') && (
        <Button
          variant="unset"
          size="unset"
          className="hover:underline hover:text-rose-600 mb-1"
          onClick={handleClear}
        >
        {t('BookSearch.clearSearch')} <XCircle className="w-4 h-4 ml-1" /> 
        </Button>
      )}
      <div className="relative sm:ml-auto md:grow-0">
        <form onSubmit={handleSearch}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('BookSearch.searchPlaceholder')}
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
