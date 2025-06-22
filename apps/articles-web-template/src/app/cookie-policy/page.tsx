import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center py-8">
      <Card className="w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold mb-4">Cookie Policy</h1>
        <p className="mb-4">
          This site uses third-party cookies to show personalized ads and analyze traffic. By using
          this site, you accept our cookie policy. Please review our full cookie policy for more
          information.
        </p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </Card>
    </main>
  );
}
