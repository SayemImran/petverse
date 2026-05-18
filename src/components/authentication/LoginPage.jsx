"use client";
import { signIn } from "@/app/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    await signIn.email({
      email: data.email,
      password: data.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          setError(ctx.error.message);
        },
      },
    });
  };

  const signInWithGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.18),transparent_18%),linear-gradient(135deg,#020617,#0b1220)] flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-8 shadow-[0_35px_80px_-30px_rgba(15,23,42,0.9)] backdrop-blur-3xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.16),transparent_30%)] opacity-60" />
        <div className="relative grid gap-6">
          <div className="space-y-2 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200/80">
              Welcome back
            </p>
            <h1 className="text-3xl font-semibold text-white">
              Petverse Login
            </h1>
            <p className="text-sm text-slate-300">
              Sign in to explore your pet universe.
            </p>
          </div>

          <Form className="grid gap-5" onSubmit={onSubmit}>
            <TextField
              isRequired
              name="email"
              type="email"
              validate={(value) => {
                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                  return "Please enter a valid email address";
                }
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-200">
                Email
              </Label>
              <Input
                className="rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm shadow-slate-950/10 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                placeholder="Enter your email"
              />
              <FieldError className="text-sm text-rose-300" />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 6)
                  return "Password must be at least 6 characters";
                if (!/[A-Z]/.test(value))
                  return "Password must contain at least one uppercase letter";
                if (!/[0-9]/.test(value))
                  return "Password must contain at least one number";
                return null;
              }}
            >
              <Label className="text-sm font-semibold text-slate-200">
                Password
              </Label>
              <Input
                className="rounded-3xl border border-white/20 bg-white/10 px-4 py-3 text-slate-100 placeholder:text-slate-400 shadow-sm shadow-slate-950/10 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/20"
                placeholder="Enter your password"
              />
              <Description className="text-xs text-slate-400">
                Must be at least 6 characters with 1 uppercase and 1 number
              </Description>
              <FieldError className="text-sm text-rose-300" />
            </TextField>

            {error && <p className="text-sm text-rose-300">{error}</p>}

            <div className="flex items-center gap-3">
              <Button
                type="submit"
                className="rounded-full bg-cyan-400/95 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Login
              </Button>

              <Button
                type="button"
                onClick={signInWithGoogle}
                className="flex flex-1 items-center justify-center gap-3 rounded-full border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
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
                Sign in with Google
              </Button>
            </div>

            <div className="text-center">
              <Link
                href="/register"
                className="text-sm text-slate-300 hover:text-white"
              >
                Don&apos;t have an account? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;