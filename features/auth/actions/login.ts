"use server";

import { redirect } from "next/navigation";

import { LoginService } from "../services/login.service";
import {
  loginSchema,
  type LoginFormValues,
} from "../validation/login-schema";

import type { AuthActionState } from "../types/auth";

export async function loginAction(
  values: LoginFormValues
): Promise<AuthActionState> {
  const validated = loginSchema.safeParse(values);

  if (!validated.success) {
    return {
      success: false,
      error:
        validated.error.issues[0]?.message ??
        "Invalid login credentials.",
    };
  }

  try {
    await LoginService.login(
      validated.data.email,
      validated.data.password
    );
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to login.",
    };
  }

  redirect("/dashboard");
}