import { z } from "zod";

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: `'Email' is required.`,
        invalid_type_error: `'Email' must be a string.`,
      })
      .email({
        message: `'Email' must be a valid email address.`,
      }),
    password: z
      .string({
        required_error: `'Password' is required.`,
        invalid_type_error: `'Password' must be a string.`,
      })
      .min(8, `'Password' must be at least 8 characters long.`)
      .max(32, `'Password' must be at most 32 characters long.`),
  }),
});

export const signUpSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: `'Email' is required.`,
        invalid_type_error: `'Email' must be a string.`,
      })
      .email({
        message: `'Email' must be a valid email address.`,
      }),
    fullname: z
      .string({
        required_error: `'Fullname' is required.`,
        invalid_type_error: `'Fullname' must be a string.`,
      })
      .min(6, `'Fullname' must be at least 6 characters long.`),
    password: z
      .string({
        required_error: `'Password' is required.`,
        invalid_type_error: `'Password' must be a string.`,
      })
      .min(8, `'Password' must be at least 8 characters long.`)
      .max(32, `'Password' must be at most 32 characters long.`),
  }),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
