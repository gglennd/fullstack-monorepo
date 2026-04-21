import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ArrowRight, Check, Eye, EyeOff } from "@workspace/ui/icons";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

const signupSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address").min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, "You must accept the terms and conditions"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
    validators: {
      onChange: signupSchema,
    },
    onSubmit: async ({ value }) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);

      // Handle successful signup
      console.log("Signup submitted:", value);
    },
  });

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8)
      strength++;
    if (/[A-Z]/.test(password))
      strength++;
    if (/\d/.test(password))
      strength++;
    if (/[^A-Z0-9]/i.test(password))
      strength++;
    return strength;
  };

  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];
  const strengthColors = ["bg-destructive", "bg-warning", "bg-revolut-teal", "bg-revolut-blue"];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4">
            <span className="text-primary-foreground font-bold text-lg">S</span>
          </div>
          <h1 className="font-display font-medium text-3xl tracking-tight text-foreground">
            Create an account
          </h1>
          <p className="mt-2 text-muted-foreground">
            Get started with your free account today
          </p>
        </div>

        {/* Signup Form */}
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
              {/* Name Field */}
              <form.Field
                name="name"
                children={(field) => (
                  <Field>
                    <FieldLabel>
                      <Label htmlFor={field.name}>Full name</Label>
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id={field.name}
                        name={field.name}
                        type="text"
                        autoComplete="name"
                        placeholder="John Doe"
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

              {/* Email Field */}
              <form.Field
                name="email"
                children={(field) => (
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
                children={(field) => {
                  const passwordStrength = getPasswordStrength(field.state.value);
                  return (
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
                            autoComplete="new-password"
                            placeholder="Create a strong password"
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

                        {/* Password Strength Indicator */}
                        {field.state.value && (
                          <div className="mt-2 space-y-2">
                            <div className="flex gap-1">
                              {[1, 2, 3, 4].map(level => (
                                <div
                                  key={level}
                                  className={`h-1 flex-1 rounded-full transition-colors ${
                                    level <= passwordStrength
                                      ? strengthColors[passwordStrength - 1]
                                      : "bg-muted"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-muted-foreground">Strength:</span>
                              <span className={`font-medium ${
                                passwordStrength >= 3
                                  ? "text-revolut-teal"
                                  : passwordStrength >= 2
                                    ? "text-revolut-blue"
                                    : passwordStrength >= 1 ? "text-warning" : "text-destructive"
                              }`}
                              >
                                {strengthLabels[passwordStrength - 1] || "Too weak"}
                              </span>
                            </div>
                          </div>
                        )}

                        <FieldError
                          errors={field.state.meta.isTouched
                            ? field.state.meta.errors.map(err => typeof err === "string" ? { message: err } : (err as { message?: string }))
                            : undefined}
                        />

                        <FieldDescription>
                          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mt-2">
                            <div className={`flex items-center gap-1 ${field.state.value.length >= 8 ? "text-revolut-teal" : ""}`}>
                              <Check className={`h-3 w-3 ${field.state.value.length >= 8 ? "opacity-100" : "opacity-40"}`} />
                              At least 8 characters
                            </div>
                            <div className={`flex items-center gap-1 ${/[A-Z]/.test(field.state.value) ? "text-revolut-teal" : ""}`}>
                              <Check className={`h-3 w-3 ${/[A-Z]/.test(field.state.value) ? "opacity-100" : "opacity-40"}`} />
                              One uppercase letter
                            </div>
                            <div className={`flex items-center gap-1 ${/\d/.test(field.state.value) ? "text-revolut-teal" : ""}`}>
                              <Check className={`h-3 w-3 ${/\d/.test(field.state.value) ? "opacity-100" : "opacity-40"}`} />
                              One number
                            </div>
                            <div className={`flex items-center gap-1 ${/[^A-Z0-9]/i.test(field.state.value) ? "text-revolut-teal" : ""}`}>
                              <Check className={`h-3 w-3 ${/[^A-Z0-9]/i.test(field.state.value) ? "opacity-100" : "opacity-40"}`} />
                              One special character
                            </div>
                          </div>
                        </FieldDescription>
                      </FieldContent>
                    </Field>
                  );
                }}
              />

              {/* Confirm Password Field */}
              <form.Field
                name="confirmPassword"
                children={(field) => (
                  <Field>
                    <FieldLabel>
                      <Label htmlFor={field.name}>Confirm password</Label>
                    </FieldLabel>
                    <FieldContent>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type={showConfirmPassword ? "text" : "password"}
                          autoComplete="new-password"
                          placeholder="Confirm your password"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={e => field.handleChange(e.target.value)}
                          className="h-11 pr-10"
                          aria-invalid={field.state.meta.isTouched && !!field.state.meta.errors.length}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          tabIndex={-1}
                        >
                          {showConfirmPassword
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
                    </FieldContent>
                  </Field>
                )}
              />

              {/* Terms Checkbox */}
              <form.Field
                name="acceptTerms"
                children={(field) => (
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id={field.name}
                      checked={field.state.value}
                      onCheckedChange={checked => field.handleChange(checked as boolean)}
                      className="mt-0.5"
                    />
                    <div className="space-y-1">
                      <Label htmlFor={field.name} className="text-sm font-normal cursor-pointer">
                        I accept the
                        {" "}
                        <a href="#" className="text-primary hover:underline">Terms of Service</a>
                        {" "}
                        and
                        {" "}
                        <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                      </Label>
                      <FieldError
                        errors={field.state.meta.isTouched
                          ? field.state.meta.errors.map(err => typeof err === "string" ? { message: err } : (err as { message?: string }))
                          : undefined}
                      />
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
                          Creating account...
                        </span>
                      )
                    : (
                        <span className="flex items-center gap-2">
                          Create account
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

          {/* Social Signup */}
          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" className="w-full h-11" disabled={isLoading}>
              <Check className="mr-2 h-4 w-4" />
              Continue with GitHub
            </Button>
          </div>
        </div>

        {/* Login Link */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?
          {" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
