import { initTsrReactQuery } from '@ts-rest/react-query/v5';
import { contract } from '@auto-articles/ts-rest';

export const tsr = initTsrReactQuery(contract, {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3333',
});
