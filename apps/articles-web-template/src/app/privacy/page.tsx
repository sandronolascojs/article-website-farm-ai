import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8">
      <Card className="w-full max-w-3xl p-6">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-4">
          This website uses cookies and other technologies to provide a better user experience. We
          do not share personal data with third parties without consent. Please review our full
          privacy policy for more details.
        </p>
        <Button asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </Card>
    </main>
  );
}
