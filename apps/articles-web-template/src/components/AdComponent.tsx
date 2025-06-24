'use client';
import React, { useEffect, useState } from 'react';
import { env } from '../../env.mjs';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { COOKIE_CONSENT_ADS_NAME } from '@/constants/cookies.constants';
import { AD_CLIENT } from '@/constants/ads.constants';

interface AdComponentProps {
  adSlot: string;
  adFormat?: string;
  adLayout?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AdComponent = ({
  adSlot,
  adFormat = 'auto',
  adLayout = '',
  className = '',
  style = {},
}: AdComponentProps) => {
  const appEnv = env.NEXT_PUBLIC_APP_ENV;
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      if (typeof document !== 'undefined') {
        setHasConsent(document.cookie.includes(`${COOKIE_CONSENT_ADS_NAME}=true`));
      }
    };
    checkConsent();
    window.addEventListener('consentChanged', checkConsent);
    return () => {
      window.removeEventListener('consentChanged', checkConsent);
    };
  }, []);

  if (appEnv === 'development') {
    const previewWidth = style?.maxWidth || 300;
    const previewHeight = style?.maxHeight || 250;

    return (
      <div
        className={cn(
          'flex items-center justify-center border-2 border-dashed border-blue-400 bg-blue-50 text-blue-700 rounded-md w-full max-w-xs mx-auto',
          className,
        )}
        style={{
          height: previewHeight,
          minHeight: 60,
          ...style,
        }}
      >
        <span className="text-xs font-semibold text-center">
          [Ad Preview: {adSlot}] {previewWidth}x{previewHeight}
        </span>
      </div>
    );
  }

  if (!hasConsent) {
    return null;
  }

  return (
    <>
      <Script
        id="adsbygoogle-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (window).adsbygoogle = (window).adsbygoogle || [];
          (window).adsbygoogle.push({});
        `,
        }}
      />
      <ins
        className={cn('adsbygoogle', className)}
        style={{ display: 'block', ...style }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-ad-layout={adLayout}
      />
    </>
  );
};
