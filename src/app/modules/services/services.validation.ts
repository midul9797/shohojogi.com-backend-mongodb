import { z } from 'zod';

const createServicesZodSchema = z.object({
  body: z.object({
    name: z.string(),
    first_banner_img: z.string(),
    second_banner_img: z.string(),
    thumbnail: z.string().optional(),
    taglines: z.array(z.string()),
    options: z.array(
      z.object({
        name: z.string(),
        price: z.string(),
      })
    ),
    service_details: z.string(),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
  }),
});

export const servicesValidation = {
  createServicesZodSchema,
};
