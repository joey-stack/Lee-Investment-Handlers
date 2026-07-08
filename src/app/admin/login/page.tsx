"use client";

import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Lock, Mail, AlertTriangle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Check if Firebase auth is available
  useEffect(() => {
    if (!auth) {
      setErrorMsg("Firebase is not configured. Please verify your environment variables (.env.local).");
    }
  }, []);

  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push("/admin/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) {
      setErrorMsg("Firebase is not configured. Please verify your environment variables (.env.local).");
      return;
    }
    if (!email || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      console.error("Login failure:", err);
      // Map Firebase auth codes to client-friendly errors
      switch (err.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setErrorMsg("Invalid credentials. Please verify your email and password.");
          break;
        case "auth/invalid-email":
          setErrorMsg("Please enter a valid email address.");
          break;
        case "auth/too-many-requests":
          setErrorMsg("Too many failed attempts. Access has been temporarily locked.");
          break;
        default:
          setErrorMsg(err.message || "Authentication failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || user) {
    return (
      <div className="min-h-screen bg-brand-bg-primary flex flex-col items-center justify-center font-body">
        <div className="h-10 w-10 border-2 border-brand-alternate/20 border-t-brand-alternate rounded-full animate-spin mb-4" />
        <span className="text-xs text-brand-secondary tracking-widest uppercase font-medium">
          Authorizing...
        </span>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4 py-16 relative overflow-hidden font-body text-white select-none">
      {/* Background premium glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,110,0.04)_0%,rgba(0,0,0,0)_60%)] pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-md animate-fade-up">
        {/* Logo and header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 bg-brand-alternate/10 text-brand-alternate border border-brand-alternate/20 rounded-none mb-4">
            <Lock size={24} />
          </div>
          <h1 className="font-heading text-3xl font-normal leading-tight tracking-tight text-white mb-2">
            Admin Portal
          </h1>
          <p className="text-sm text-white/50 font-light leading-relaxed">
            Access authorized for LEE Investment committee members only.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#121212]/90 border border-white/10 rounded-[6px] p-8 shadow-[0px_24px_48px_rgba(0,0,0,0.25)] backdrop-blur-md">
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/20 text-red-400 text-xs rounded-[4px] flex items-start gap-3">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <span className="leading-relaxed font-light">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-medium text-white/70 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full h-12 pl-11 pr-4 bg-white/5 text-white border border-white/10 rounded-[6px] text-sm focus:outline-none focus:border-brand-alternate placeholder-white/20 transition-all duration-250 font-medium"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-xs font-medium text-white/70 uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full h-12 pl-11 pr-12 bg-white/5 text-white border border-white/10 rounded-[6px] text-sm focus:outline-none focus:border-brand-alternate placeholder-white/20 transition-all duration-250 font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/30 hover:text-white/60 transition-colors select-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Action button */}
            <Button
              variant="primary"
              type="submit"
              className="w-full h-12 font-medium shadow-[0px_4px_12px_rgba(200,169,110,0.15)] hover:shadow-[0px_8px_24px_rgba(200,169,110,0.25)] text-brand-primary uppercase tracking-wider text-xs"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Authenticating..." : "Login"}
            </Button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-white/40 hover:text-brand-alternate transition-colors duration-250 leading-relaxed font-light"
          >
            ← Back to Public Website
          </a>
        </div>
      </div>
    </main>
  );
}
