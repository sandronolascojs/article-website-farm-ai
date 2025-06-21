'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { tsr } from '../lib/tsrClient';
import { queryClient } from '@/lib/queryClient';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <tsr.ReactQueryProvider>{children}</tsr.ReactQueryProvider>
    </QueryClientProvider>
  );
}
