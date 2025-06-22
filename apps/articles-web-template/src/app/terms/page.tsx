import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center py-8">
      <Card className="w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-4">
          These are the terms and conditions for using this website. By continuing to use this site,
          you agree to these terms. Please review our full terms and conditions for more
          information.
        </p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </Card>
    </main>
  );
}
