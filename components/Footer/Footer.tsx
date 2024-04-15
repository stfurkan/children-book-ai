import Link from 'next/link';
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <div>
      <hr />
      <footer className="flex flex-col font-mono text-center mt-4">
        <div>
          Children&lsquo;s Book AI &copy; 2024
        </div>
        <div className="text-sm">
          <Link
            href="/privacy-policy"
            className="hover:underline"
          >
            {t('privacy')}
          </Link>
          <Link
            href="/terms-of-service"
            className="ml-4 hover:underline"
          >
            {t('terms')}
          </Link>
        </div>
      </footer>
    </div>
  );
}
