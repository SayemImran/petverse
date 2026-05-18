"use client";
import React, { useState } from "react";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/app/lib/auth-client";

const RegistrationPage = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitError, setSubmitError] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (password !== confirm) {
      setSubmitError("Passwords do not match");
      return;
    }
    if (
      password.length < 6 ||
      !/[A-Z]/.test(password) ||
      !/[a-z]/.test(password)
    ) {
      setSubmitError("Password does not meet complexity requirements");
      return;
    }

    setSubmitError(null);

    const { data: registerData, error } = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
      image: data.photoUrl || "",
      autoSignIn: false,
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: (ctx) => {
          setSubmitError(ctx.error.message);
        },
      },
    });
    console.log(registerData);
    console.log(error);
  };
  const signInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  const passwordValidate = (value) => {
    if (value.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter";
    return null;
  };

  const hasLength = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const passwordsMatch = password.length > 0 && password === confirm;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.12),transparent_18%),linear-gradient(135deg,#020617,#071025)] flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-8 shadow-[0_30px_60px_-20px_rgba(2,6,23,0.9)] backdrop-blur-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.12),transparent_30%)] opacity-60" />
        <div className="relative grid gap-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200/80">
              Create account
            </p>
            <h2 className="text-2xl font-semibold text-white">Join Petverse</h2>
            <p className="text-sm text-slate-300">
              Create your account to manage pets and profiles.
            </p>
          </div>

          <Form className="grid gap-4" onSubmit={onSubmit}>
            <Fieldset>
              <Fieldset.Legend />
              <Description />
              <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <TextField
                  isRequired
                  name="name"
                  validate={(value) =>
                    value.length < 3
                      ? "Name must be at least 3 characters"
                      : null
                  }
                >
                  <Label className="text-sm font-medium text-slate-200">
                    Name
                  </Label>
                  <Input
                    className="rounded-2xl border border-white/20 bg-white/6 px-4 py-3 text-slate-100 placeholder:text-slate-400"
                    placeholder="John Doe"
                  />
                  <FieldError className="text-sm text-rose-300" />
                </TextField>

                <TextField isRequired name="email" type="email">
                  <Label className="text-sm font-medium text-slate-200">
                    Email
                  </Label>
                  <Input
                    className="rounded-2xl border border-white/20 bg-white/6 px-4 py-3 text-slate-100 placeholder:text-slate-400"
                    placeholder="john@example.com"
                  />
                  <FieldError className="text-sm text-rose-300" />
                </TextField>

                <div className="sm:col-span-2">
                  <TextField name="photoUrl">
                    <Label className="text-sm font-medium text-slate-200">
                      Photo URL
                    </Label>
                    <Input
                      className="rounded-2xl border border-white/20 bg-white/6 px-4 py-3 text-slate-100 placeholder:text-slate-400"
                      placeholder="https://..."
                    />
                    <FieldError className="text-sm text-rose-300" />
                  </TextField>
                </div>

                <div className="sm:col-span-2">
                  <TextField
                    isRequired
                    name="password"
                    type="password"
                    validate={passwordValidate}
                  >
                    <Label className="text-sm font-medium text-slate-200">
                      Password
                    </Label>
                    <Input
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="rounded-2xl border border-white/20 bg-white/6 px-4 py-3 text-slate-100 placeholder:text-slate-400"
                      placeholder="Create a password"
                    />

                    <div className="mt-2 grid gap-1 text-sm">
                      <div
                        className={`flex items-center gap-3 ${hasLength ? "text-emerald-300" : "text-slate-400"}`}
                      >
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${hasLength ? "bg-emerald-600/20 text-emerald-300" : "border border-white/10"}`}
                        >
                          {hasLength ? "✓" : ""}
                        </span>
                        <span>At least 6 characters</span>
                      </div>

                      <div
                        className={`flex items-center gap-3 ${hasUpper ? "text-emerald-300" : "text-slate-400"}`}
                      >
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${hasUpper ? "bg-emerald-600/20 text-emerald-300" : "border border-white/10"}`}
                        >
                          {hasUpper ? "✓" : ""}
                        </span>
                        <span>One uppercase letter</span>
                      </div>

                      <div
                        className={`flex items-center gap-3 ${hasLower ? "text-emerald-300" : "text-slate-400"}`}
                      >
                        <span
                          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${hasLower ? "bg-emerald-600/20 text-emerald-300" : "border border-white/10"}`}
                        >
                          {hasLower ? "✓" : ""}
                        </span>
                        <span>One lowercase letter</span>
                      </div>
                    </div>

                    <FieldError className="text-sm text-rose-300" />
                  </TextField>
                </div>

                <div className="sm:col-span-2">
                  <TextField
                    isRequired
                    name="confirmPassword"
                    type="password"
                    validate={(value) =>
                      value !== password ? "Passwords must match" : null
                    }
                  >
                    <Label className="text-sm font-medium text-slate-200">
                      Confirm Password
                    </Label>
                    <Input
                      name="confirmPassword"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="rounded-2xl border border-white/20 bg-white/6 px-4 py-3 text-slate-100 placeholder:text-slate-400"
                      placeholder="Confirm password"
                    />
                    <FieldError className="text-sm text-rose-300" />
                  </TextField>

                  <div className="mt-1">
                    <div
                      className={`flex items-center gap-2 text-sm ${passwordsMatch ? "text-emerald-300" : "text-slate-400"}`}
                    >
                      <span
                        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold ${passwordsMatch ? "bg-emerald-600/20 text-emerald-300" : "border border-white/10"}`}
                      >
                        {passwordsMatch ? "✓" : ""}
                      </span>
                      <span>
                        {passwordsMatch
                          ? "Passwords match"
                          : "Passwords must match"}
                      </span>
                    </div>
                  </div>
                </div>
              </FieldGroup>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <div className="flex w-full gap-3 sm:w-auto">
                  <Button
                    type="submit"
                    className="w-full sm:w-auto rounded-full bg-cyan-400/95 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Register
                  </Button>

                  <Button
                    type="button"
                    onClick={signInWithGoogle}
                    className="w-full sm:w-auto flex-1 sm:flex-none flex items-center gap-3 justify-center rounded-full bg-white/6 px-4 py-2 text-sm font-semibold text-white border border-white/10 hover:bg-white/10"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path
                        d="M44.5 20H24v8.5h11.9C34.6 32.6 30.8 36 24 36c-7.5 0-13.5-6-13.5-13.5S16.5 9 24 9c3.7 0 6.2 1.6 7.6 3l5.8-5.6C34.7 4.2 29.7 2 24 2 12.3 2 3 11.3 3 23s9.3 21 21 21c12.1 0 20.9-8.5 20.9-20.7 0-1.4-.2-2.6-.4-3.3z"
                        fill="#EA4335"
                      />
                    </svg>
                    <span>Sign in with Google</span>
                  </Button>
                </div>
              </div>

              <div className="text-center sm:text-center">
                <Link
                  href="/login"
                  className="text-sm text-slate-300 hover:text-white"
                >
                  Already have an account? Log in
                </Link>
              </div>

              {submitError && (
                <div className="mt-3 text-sm text-rose-300">{submitError}</div>
              )}
            </Fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
