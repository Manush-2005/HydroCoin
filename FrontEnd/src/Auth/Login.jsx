import React from "react";
import LoginForm from "@/components/LoginForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Login = () => {
  return (
    <main className="grid px-6 py-12 text-gray-100 bg-gray-900 min-h-dvh place-items-center">
      <Card className="w-full max-w-4xl bg-gray-800 border shadow-xl border-green-400/30">
        <CardHeader className="border-b border-green-400/20">
          <CardTitle className="text-2xl font-semibold text-center text-green-400">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Login to your HydrogenChain account and continue trading securely.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default Login;
