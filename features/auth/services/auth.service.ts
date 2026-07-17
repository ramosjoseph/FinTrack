import { createClient } from "@/lib/supabase/server";

export class AuthService {
  static async register(
    fullName: string,
    email: string,
    password: string
  ) {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error("Unable to create user.");
    }

    return data.user;
  }
}