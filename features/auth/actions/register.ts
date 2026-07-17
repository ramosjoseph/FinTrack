"use server";

import type { AuthActionState } from "../types/auth";
import { AuthService } from "../services/auth.service";
import {
  registerSchema,
  type RegisterFormValues,
} from "../validation/register-schema";

export async function registerAction(
  values: RegisterFormValues
): Promise<AuthActionState> {
  const validated = registerSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error:
        validated.error.issues[0]?.message ??
        "Invalid form data.",
    };
  }

  try {
    const { fullName, email, password } = validated.data;

    await AuthService.register(
      fullName,
      email,
      password
    );

    return {
      success: true,
      message:
        "Account created successfully. Please check your email to verify your account.",
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Something went wrong.",
    };
  }
}