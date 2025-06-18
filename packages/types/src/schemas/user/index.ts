import { z } from 'zod';
import { emailValidation, nameValidation, passwordValidation } from '../common.validations';

export const createUserSchema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});
