import React from "react";

import RegisterForm from "@/components/RegisterForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GovRegisterForm from "@/components/GovRegisterForm";

const GovRegister = () => {
  return (
    <main className="grid px-4 py-12 text-gray-100 bg-gray-900 min-h-dvh place-items-center">
      <Card className="w-full max-w-3xl bg-gray-800 border shadow-lg border-green-400/30">
        <CardHeader className="[.border-b]:border-green-500/20">
          <CardTitle className="text-2xl font-semibold text-center text-green-500">
            Create your account as Government Entity
          </CardTitle>
          <CardDescription className="text-center">
            Join the HydrogenChain network to access secure, transparent
            trading.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <GovRegisterForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default GovRegister;
