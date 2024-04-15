import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center space-y-8">
      <h2 className="font-mono text-2xl md:text-3xl font-bold text-center mb-8">~ Page Not Found ~</h2>
      <p className="text-lg">
        The page you are looking for does not exist. Please return to the home page.
      </p>
      <Link href="/"><Button>Return Home</Button></Link>
    </div>
  );
}
