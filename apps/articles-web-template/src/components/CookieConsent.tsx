'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { COOKIE_CONSENT_ADS_NAME } from '@/constants/cookies.constants';

export const CookieConsent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShow(!document.cookie.includes(`${COOKIE_CONSENT_ADS_NAME}=true`));
    }
  }, []);

  const onAccept = () => {
    document.cookie = `${COOKIE_CONSENT_ADS_NAME}=true; path=/; max-age=31536000`;
    setShow(false);
    window.dispatchEvent(new Event('consentChanged'));
  };

  const onClose = () => {
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-end z-50">
      <Card>
        <CardHeader>
          <CardTitle>Cookie Consent</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            We use cookies to personalize advertising and analyze traffic. By continuing, you accept
            our{' '}
            <Link href="/cookie-policy" className="underline">
              Cookie Policy
            </Link>
            .
          </p>
        </CardContent>
        <CardFooter className="flex justify-end gap-1">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={onAccept}>Accept</Button>
        </CardFooter>
      </Card>
    </div>
  );
};
