import React, { useState } from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      location: { lat: "", lon: "" },
      walletId: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    // Convert lat/lon into number
    const formattedData = {
      ...values,
      location: {
        lat: Number(values.location.lat),
        lon: Number(values.location.lon),
      },
    };

    console.log("[register]", formattedData);
    try {
      const response = await fetch("http://localhost:8000/signup/producer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log("[register] Success:", data);
      form.reset();
    } catch (error) {
      console.error("[register]", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5">
        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Company/Producer Name"
                    {...field}
                    className="focus-visible:ring-green-500/40 focus-visible:border-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                    className="focus-visible:ring-green-500/40 focus-visible:border-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Password + Wallet ID */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pr-10 focus-visible:ring-green-500/40 focus-visible:border-green-500"
                      {...field}
                    />
                  </FormControl>
                  <button
                    type="button"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute inset-y-0 grid right-2 place-items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="walletId"
            rules={{ required: "Wallet ID is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234"
                    {...field}
                    className="focus-visible:ring-green-500/40 focus-visible:border-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ranoli, Vadodara"
                  {...field}
                  className="focus-visible:ring-green-500/40 focus-visible:border-green-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location lat + lon */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="location.lat"
            rules={{ required: "Latitude is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Latitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="22.3951077"
                    {...field}
                    className="focus-visible:ring-green-500/40 focus-visible:border-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location.lon"
            rules={{ required: "Longitude is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Longitude</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="any"
                    placeholder="73.1188011"
                    {...field}
                    className="focus-visible:ring-green-500/40 focus-visible:border-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Submit button */}
        <Button
          type="submit"
          className="w-full text-black bg-green-500 shadow-md hover:bg-green-500/90 focus-visible:ring-green-500/40 hover:shadow-lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Creating account..."
            : "Create account"}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          By creating an account, you agree to our Terms and Privacy Policy.
        </p>
      </form>
    </Form>
  );
}
