import { text } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const generateIdField = ({ name }: { name: string }) => {
  return text(name)
    .primaryKey()
    .$defaultFn(() => createId())
    .notNull()
    .unique();
};
