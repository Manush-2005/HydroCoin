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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthContext } from "@/Context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuthGovContext } from "@/Context/GovContext";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginType, setLoginType] = useState("producer"); // default producer
  const { storeTokenInLS } = useAuthContext();
  const { storeTokenGovInLS } = useAuthGovContext();
  const navigate = useNavigate();
  const { userLogout } = useAuthContext();
  const { userLogoutAsGov } = useAuthGovContext();
  console.log(loginType);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      userLogout();
      userLogoutAsGov();
      const endpoint =
        loginType === "producer"
          ? "http://localhost:8000/login/producer"
          : "http://localhost:8000/login/government";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const res_data = await response.json();
        console.log(res_data);
        if (loginType == "producer") {
          storeTokenInLS(res_data.token);
        } else {
          storeTokenGovInLS(res_data.token);
        }

        toast.success("Login Successfully !");
        navigate("/");
      } else {
        toast.error("Invalid email or password !!");
      }
    } catch (error) {
      console.error("[login] Error:", error.message);
    }
  };

  const handleRegister = (role) => {
    setOpen(false);
    navigate(`/register/${role}`);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full gap-6"
        >
          {/* Login Type Selection */}
          <div className="flex items-center justify-between gap-4">
            <label className="text-sm font-medium text-gray-300 w-[100px]">
              Login as:
            </label>
            <select
              value={loginType}
              onChange={(e) => setLoginType(e.target.value)}
              className="w-full p-2 text-white bg-gray-700 border border-gray-600 rounded-lg focus:ring-green-500 focus:border-green-500"
            >
              <option value="producer">Producer</option>
              <option value="government">Government Entity</option>
            </select>
          </div>

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
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
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
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-green-400 hover:underline"
            >
              Register here
            </button>
          </p>
        </form>
      </Form>

      {/* Register Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="text-gray-100 bg-gray-800 border border-green-400/30">
          <DialogHeader>
            <DialogTitle className="text-lg text-green-400">
              Choose Registration
            </DialogTitle>
            <DialogDescription className="text-gray-300">
              Select your role to continue registration.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            <Button
              onClick={() => handleRegister("producer")}
              className="w-full text-black bg-green-500 hover:bg-green-500/90"
            >
              Register as Producer
            </Button>
            <Button
              onClick={() => handleRegister("government")}
              className="w-full text-black bg-green-500 hover:bg-green-500/90"
            >
              Register as Government
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
