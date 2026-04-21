import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ArrowRight, Eye, EyeOff } from "@workspace/ui/icons";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters").min(1, "Password is required"),
  rememberMe: z.boolean(),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);

      // Handle successful login
      console.log("Login submitted:", value);
    },
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <h1 className="font-display font-medium text-3xl tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-2 text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-6"
          >
            <FieldGroup>
              {/* Email Field */}
              <form.Field
                name="email"
                children={field => (
                  <Field>
                    <FieldLabel>
                      <Label htmlFor={field.name}>Email address</Label>
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        autoComplete="email"
                        placeholder="you@example.com"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={e => field.handleChange(e.target.value)}
                        className="h-11"
                        aria-invalid={field.state.meta.isTouched && !!field.state.meta.errors.length}
                      />
                      <FieldError
                        errors={field.state.meta.isTouched
                          ? field.state.meta.errors.map(err => typeof err === "string" ? { message: err } : (err as { message?: string }))
                          : undefined}
                      />
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Password Field */}
              <form.Field
                name="password"
                children={field => (
                  <Field>
                    <FieldLabel>
                      <Label htmlFor={field.name}>Password</Label>
                    </FieldLabel>
                    <FieldContent>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          className="h-11 pr-10"
                          aria-invalid={field.state.meta.isTouched && !!field.state.meta.errors.length}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showPassword
                            ? (
                                <EyeOff className="h-4 w-4" />
                              )
                            : (
                                <Eye className="h-4 w-4" />
                              )}
                        </button>
                      </div>
                      <FieldError
                        errors={field.state.meta.isTouched
                          ? field.state.meta.errors.map(err => typeof err === "string" ? { message: err } : (err as { message?: string }))
                          : undefined}
                      />
                      <FieldDescription>
                        <Link
                          to="/"
                          className="text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          Forgot your password?
                        </Link>
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Remember Me */}
              <form.Field
                name="rememberMe"
                children={field => (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={field.name}
                        checked={field.state.value}
                        onCheckedChange={checked => field.handleChange(checked as boolean)}
                      />
                      <Label
                        htmlFor={field.name}
                        className="text-sm font-normal cursor-pointer"
                      >
                        Remember me
                      </Label>
                    </div>
                  </div>
                )}
              />
            </FieldGroup>

            {/* Submit Button */}
            <form.Subscribe
              selector={state => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  variant="pill"
                  size="pill"
                  className="w-full"
                  disabled={!canSubmit || isSubmitting || isLoading}
                >
                  {isSubmitting || isLoading
                    ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Signing in...
                        </span>
                      )
                    : (
                        <span className="flex items-center gap-2">
                          Sign in
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      )}
                </Button>
              )}
            />
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="w-full h-11" disabled={isLoading}>
              <Eye className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?
          {" "}
          <Link
            to="/signup"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
