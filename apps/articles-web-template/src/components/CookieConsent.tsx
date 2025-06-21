'use client';
import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const COOKIE_NAME = 'site_consent';

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShow(!document.cookie.includes(`${COOKIE_NAME}=true`));
    }
  }, []);

  const onAccept = () => {
    document.cookie = `${COOKIE_NAME}=true; path=/; max-age=31536000`;
    setShow(false);
    window.dispatchEvent(new Event('consentChanged'));
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end z-50">
      <Card className="w-full sm:max-w-xl mx-auto rounded-t p-6">
        <p className="text-sm mb-4">
          We use cookies to personalize advertising and analyze traffic. By continuing, you accept
          our{' '}
          <Link href="/cookie-policy" className="underline">
            Cookie Policy
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <Button className="w-full" onClick={onAccept}>
          Accept
        </Button>
      </Card>
    </div>
  );
};
