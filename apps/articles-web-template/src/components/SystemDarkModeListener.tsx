'use client';

import { useEffect } from 'react';

export const SystemDarkModeListener = () => {
  useEffect(() => {
    const updateDarkClass = () => {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateDarkClass();

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', updateDarkClass);

    return () => {
      media.removeEventListener('change', updateDarkClass);
    };
  }, []);

  return null;
};
