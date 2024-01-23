import { z } from 'zod';
const createUserZodSchema = z.object({
  body: z.object({
    first_name: z.string({
      required_error: 'First Name is required',
    }),
    last_name: z.string({
      required_error: 'Last Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),

    contactNo: z.string().optional(),
    address: z
      .object({
        house: z.string().optional(),
        block: z.string().optional(),
        ward: z.string().optional(),
        road: z.string().optional(),
        zip: z.string().optional(),
        city: z.string().optional(),
      })
      .optional(),
    profileImg: z.string().optional(),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    contactNo: z.string().optional(),
    address: z
      .object({
        house: z.string().optional(),
        block: z.string().optional(),
        ward: z.string().optional(),
        road: z.string().optional(),
        zip: z.string().optional(),
        city: z.string().optional(),
      })
      .optional(),
    profileImg: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
  updateUserZodSchema,
};
