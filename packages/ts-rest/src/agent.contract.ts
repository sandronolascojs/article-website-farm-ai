import { initContract } from '@ts-rest/core';
import { z } from 'zod';
import { errorsSchema } from '@auto-articles/utils';
import { createAgentSchema } from '@auto-articles/types';

const contract = initContract();

export const agent = contract.router({
  createAgent: {
    method: 'POST',
    path: '/agent',
    body: createAgentSchema,
    responses: {
      204: z.undefined(),
      ...errorsSchema,
    },
    summary: 'Creates a new agent',
  },
});
