import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import path from 'node:path';
import fs from 'node:fs';
import { env } from '../../../env.mjs';

const PLACEHOLDER_MAP = {
  PRIVACY_EMAIL: env.NEXT_PUBLIC_PRIVACY_EMAIL,
};

function replacePlaceholders(markdown: string, map: Record<string, string>) {
  return Object.entries(map).reduce(
    (acc, [key, value]) => acc.replace(new RegExp(`{{${key}}}`, 'g'), value),
    markdown,
  );
}

export default async function CookiePolicyPage() {
  const filePath = path.join(process.cwd(), 'cookies.md');
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
