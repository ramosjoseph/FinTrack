"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import { loginAction } from "../actions/login";
import {
  loginSchema,
  type LoginFormValues,
} from "../validation/login-schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function LoginForm() {
  const router = useRouter();

  const [pending, startTransition] =
    useTransition();

  const [showPassword, setShowPassword] =
    useState(false);

  const [serverError, setServerError] =
    useState("");

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(
    values: LoginFormValues
  ) {
    setServerError("");

    startTransition(async () => {
      const result =
        await loginAction(values);

      if (!result.success) {
        setServerError(
          result.error ??
            "Login failed."
        );

        return;
      }

      router.push("/dashboard");
      router.refresh();
    });
  }

  return (
    <Card className="w-full max-w-lg overflow-hidden rounded-3xl border-0 shadow-2xl">
      <div className="p-10">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
            <ShieldCheck className="h-7 w-7 text-emerald-600" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight">
            Welcome Back
          </h1>

          <p className="mt-3 text-muted-foreground">
            Sign in to access your
            financial dashboard.
          </p>
        </div>

        {serverError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {serverError}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              onSubmit
            )}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email Address
                  </FormLabel>

                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="h-11 pr-10"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full"
              disabled={pending}
            >
              {pending && (
                <Spinner className="mr-2 h-4 w-4" />
              )}

              {pending
                ? "Signing In..."
                : "Sign In"}
            </Button>

            <div className="border-t pt-6">
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                >
                  Create one
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
}