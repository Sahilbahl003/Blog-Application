import { z } from "zod";

const nameRegex = /^[A-Za-z. -]+(\s*[A-Za-z. -]+)*$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name too long")
      .regex(nameRegex, "Name must contain only letters"),

    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Invalid email address")
      .max(100, "Email too long"),

    password: z
      .string()
      .min(1, "Password is required")
      .regex(
        passwordRegex,
        "Password must include uppercase, lowercase, number and special character"
      ),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    role: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email address"),

  password: z
    .string()
    .min(1, "Password is required")
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, number and special character"
    ),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(30, "Name too long")
    .regex(nameRegex, "Name must contain only letters")
    .optional(),

  password: z
    .string()
    .regex(
      passwordRegex,
      "Password must include uppercase, lowercase, number and special character"
    )
    .optional(),
});
