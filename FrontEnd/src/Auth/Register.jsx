import React from "react";

import RegisterForm from "@/components/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Register = () => {
  return (
    <main className="grid min-h-dvh place-items-center px-6 py-12 bg-gray-900 text-gray-100">
      <Card className="w-full max-w-4xl shadow-xl border border-green-400/30 bg-gray-800">
        <CardHeader className="border-b border-green-400/20">
          <CardTitle className="text-2xl font-semibold text-center text-green-400">
            Create your account
          </CardTitle>
          <CardDescription className="text-center text-gray-300">
            Join the HydrogenChain network to access secure, transparent
            trading.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <RegisterForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;
