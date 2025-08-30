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
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "@/Context/AuthContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { storeTokenInLS } = useAuthContext();

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    console.log("[login]", values);
    try {
      const response = await fetch("http://localhost:8000/login/producer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        console.log("res_data", res_data);

        toast.success("Login Successfully !");
        navigate("/");
      } else {
        toast.error("Invalid email and password !!");
      }

      const data = await response.json();
      console.log("[login] Success:", data);

      //   form.reset();
    } catch (error) {
      console.error("[login] Error:", error.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-6"
      >
        {/* Email */}
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
              <FormLabel className="text-gray-300">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                  className="text-white bg-gray-700 border-gray-600 focus-visible:ring-green-500/40 focus-visible:border-green-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
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
              <FormLabel className="text-gray-300">Password</FormLabel>
              <div className="relative">
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pr-10 text-white bg-gray-700 border-gray-600 focus-visible:ring-green-500/40 focus-visible:border-green-500"
                    {...field}
                  />
                </FormControl>
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 grid text-gray-400 right-2 place-items-center hover:text-white"
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

        {/* Submit */}
        <Button
          type="submit"
          className="w-full text-black bg-green-500 shadow-md hover:bg-green-500/90 focus-visible:ring-green-500/40 hover:shadow-lg"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Logging in..." : "Login"}
        </Button>

        <p className="text-xs text-center text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </Form>
  );
}
