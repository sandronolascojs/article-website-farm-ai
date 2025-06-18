import { errorsSchema } from '@auto-articles/utils';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const contract = initContract();

export const users = contract.router({
  getUser: {
    method: 'GET',
    path: '/users/:userId',
    pathParams: z.object({
      userId: z.string(),
    }),
    responses: {
      200: z.object({
        userId: z.string(),
        name: z.string(),
        email: z.string(),
        profileImage: z.string().nullable(),
      }),
      ...errorsSchema,
    },
  },
});
