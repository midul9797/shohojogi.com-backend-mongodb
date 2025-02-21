import { z } from 'zod';
const createAdminZodSchema = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is Required',
    }),
  }),
});

export const AdminValidation = {
  createAdminZodSchema,
};
