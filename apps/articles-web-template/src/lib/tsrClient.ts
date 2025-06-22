import { initTsrReactQuery } from '@ts-rest/react-query/v5';
import { contract } from '@auto-articles/ts-rest';
import { env } from '../../env.mjs';

export const tsr = initTsrReactQuery(contract, {
  baseUrl: env.NEXT_PUBLIC_API_BASE,
});
