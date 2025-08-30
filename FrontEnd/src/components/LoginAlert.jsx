import React from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
// If you're using React Router, uncomment the next line and replace <a> with <Link>
// import { Link } from "react-router-dom";

// A minimal, creative dark page that simply says "login first"
// and provides a clear link to the /login route.
export default function LoginAlert() {
  return (
    <div className="min-h-screen w-full dark bg-neutral-950 text-neutral-100 overflow-hidden">
      {/* Soft gradient atmosphere */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-[32rem] w-[32rem] rounded-full bg-indigo-600/20 blur-3xl" />
      </div>

      {/* Center content */}
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900/60 backdrop-blur">
            <Lock className="h-5 w-5" />
          </div>

          {/* Title exactly as requested */}
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-neutral-200 to-neutral-500 bg-clip-text text-transparent">
              Login First
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-neutral-400">
            You need to be signed in to continue. Head over to the login page to unlock your dashboard.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            {/* If using React Router, wrap Button with <Link to="/login"> */}
            <a href="/login" className="inline-block">
              <Button className="group rounded-2xl px-5 py-5 text-base shadow-lg">
                Go to Login
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>

            <a
              href="/login"
              className="text-sm text-neutral-400 underline-offset-4 hover:underline"
            >
              or click here
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
