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
    <main className="grid px-4 py-12 min-h-dvh place-items-center">
      <Card className="w-full max-w-md shadow-lg border-green-500/30">
        <CardHeader className="[.border-b]:border-green-500/20">
          <CardTitle className="text-2xl font-semibold text-center text-green-500">
            Create your account
          </CardTitle>
          <CardDescription className="text-center">
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
