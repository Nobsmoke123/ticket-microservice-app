import { z} from 'zod';


export const loginSchema = z.object({
    email: z.string({
        required_error: `'Email' is required.`,
        invalid_type_error: `'Email' must be a string.`
    }).email({
        message: `'Email' must be a valid email address.`
    }),
    password: z.string({
        required_error: `'Password' is required.`,
        invalid_type_error: `'Password' must be a string.`
    }).min(8).max(32)
});

export type LoginInput = z.infer<typeof loginSchema>;