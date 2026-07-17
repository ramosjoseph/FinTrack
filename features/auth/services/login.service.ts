import { createClient } from "@/lib/supabase/server";

export class LoginService {
  static async login(
    email: string,
    password: string
  ) {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }
  }
}