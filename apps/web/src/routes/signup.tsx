import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { ArrowRight, Check, Eye, EyeOff } from "@workspace/ui/icons";
import { useState } from "react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    else if (!/\S[^\s@]*@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm())
      return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Handle successful signup
    console.log("Signup submitted:", formData);
  };

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

  const passwordStrength = getPasswordStrength(formData.password);
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
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              {/* Name Field */}
              <Field>
                <FieldLabel>
                  <Label htmlFor="name">Full name</Label>
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="h-11"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </FieldContent>
              </Field>

              {/* Email Field */}
              <Field>
                <FieldLabel>
                  <Label htmlFor="email">Email address</Label>
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="h-11"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <FieldError>{errors.email}</FieldError>}
                </FieldContent>
              </Field>

              {/* Password Field */}
              <Field>
                <FieldLabel>
                  <Label htmlFor="password">Password</Label>
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className="h-11 pr-10"
                      aria-invalid={!!errors.password}
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
                  {formData.password && (
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

                  {errors.password && <FieldError>{errors.password}</FieldError>}

                  <FieldDescription>
                    <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground mt-2">
                      <div className={`flex items-center gap-1 ${formData.password.length >= 8 ? "text-revolut-teal" : ""}`}>
                        <Check className={`h-3 w-3 ${formData.password.length >= 8 ? "opacity-100" : "opacity-40"}`} />
                        At least 8 characters
                      </div>
                      <div className={`flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? "text-revolut-teal" : ""}`}>
                        <Check className={`h-3 w-3 ${/[A-Z]/.test(formData.password) ? "opacity-100" : "opacity-40"}`} />
                        One uppercase letter
                      </div>
                      <div className={`flex items-center gap-1 ${/\d/.test(formData.password) ? "text-revolut-teal" : ""}`}>
                        <Check className={`h-3 w-3 ${/\d/.test(formData.password) ? "opacity-100" : "opacity-40"}`} />
                        One number
                      </div>
                      <div className={`flex items-center gap-1 ${/[^A-Z0-9]/i.test(formData.password) ? "text-revolut-teal" : ""}`}>
                        <Check className={`h-3 w-3 ${/[^A-Z0-9]/i.test(formData.password) ? "opacity-100" : "opacity-40"}`} />
                        One special character
                      </div>
                    </div>
                  </FieldDescription>
                </FieldContent>
              </Field>

              {/* Confirm Password Field */}
              <Field>
                <FieldLabel>
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                </FieldLabel>
                <FieldContent>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={e =>
                        setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="h-11 pr-10"
                      aria-invalid={!!errors.confirmPassword}
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
                  {errors.confirmPassword && (
                    <FieldError>{errors.confirmPassword}</FieldError>
                  )}
                </FieldContent>
              </Field>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={checked =>
                    setFormData({ ...formData, acceptTerms: checked as boolean })}
                  className="mt-0.5"
                />
                <div className="space-y-1">
                  <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
                    I accept the
                    {" "}
                    <a href="#" className="text-primary hover:underline">Terms of Service</a>
                    {" "}
                    and
                    {" "}
                    <a href="#" className="text-primary hover:underline">Privacy Policy</a>
                  </Label>
                  {errors.acceptTerms && (
                    <FieldError>{errors.acceptTerms}</FieldError>
                  )}
                </div>
              </div>
            </FieldGroup>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="pill"
              size="pill"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
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
