import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import path from 'node:path';
import fs from 'node:fs';
import { env } from '../../../env.mjs';

const PLACEHOLDER_MAP = {
  COMPANY_NAME: env.NEXT_PUBLIC_COMPANY_NAME,
  SITE_NAME: env.NEXT_PUBLIC_SITE_NAME,
  LEGAL_EMAIL: env.NEXT_PUBLIC_LEGAL_EMAIL,
  PRIVACY_EMAIL: env.NEXT_PUBLIC_PRIVACY_EMAIL,
  COMPANY_ADDRESS: env.NEXT_PUBLIC_COMPANY_ADDRESS,
};

function replacePlaceholders(markdown: string, map: Record<string, string>) {
  return Object.entries(map).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, 'g'), value),
    markdown,
  );
}

export default async function TermsPage() {
  const filePath = path.join(process.cwd(), 'terms-and-conditions.md');
  const rawMarkdown = fs.readFileSync(filePath, 'utf-8');
  const content = replacePlaceholders(rawMarkdown, PLACEHOLDER_MAP);

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8">
      <div className="max-w-3xl w-full px-4">
        <MarkdownRenderer content={content} />
      </div>
    </main>
  );
}
