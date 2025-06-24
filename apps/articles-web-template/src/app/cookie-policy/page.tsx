import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import path from 'node:path';
import fs from 'node:fs/promises';
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

  let rawMarkdown: string;
  try {
    rawMarkdown = await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error('Failed to read privacy policy file:', error);
    return (
      <main className="min-h-screen w-full flex flex-col items-center py-8">
        <div className="max-w-3xl w-full px-4">
          <h1>Privacy Policy Unavailable</h1>
          <p>Sorry, the privacy policy is currently unavailable. Please try again later.</p>
        </div>
      </main>
    );
  }

  const content = replacePlaceholders(rawMarkdown, PLACEHOLDER_MAP);

  return (
    <main className="min-h-screen w-full flex flex-col items-center py-8">
      <div className="max-w-3xl w-full px-4">
        <MarkdownRenderer content={content} />
      </div>
    </main>
  );
}
