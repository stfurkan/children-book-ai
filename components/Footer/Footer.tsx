import Link from 'next/link';

export function Footer() {
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
            Privacy Policy
          </Link>
          <Link
            href="/terms-of-service"
            className="ml-4 hover:underline"
          >
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
