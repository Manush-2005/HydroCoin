import React, { useState, useEffect } from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import axios from "axios";
import { LocationPicker } from "./RegisterForm";

export default function GovRegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      address: "",
      role: "",
      location: { lat: "", lon: "" },
      walletId: "",
    },
    mode: "onTouched",
  });

  // 🔹 Connect MetaMask & set walletId
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask not detected! Please install MetaMask.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];

      // Update walletId field in form
      form.setValue("walletId", address);

      console.log("Connected Wallet:", address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  const onSubmit = async (values) => {
    console.log("values:", values);

    const formattedData = {
      ...values,
      location: {
        lat: Number(values.location.lat),
        lon: Number(values.location.lon),
      },
    };

    console.log("[register]", formattedData);
    try {
      const response = await axios.post(
        "http://localhost:8000/signup/government",
        formattedData
      );

      const data = response.data;
      console.log("[register] Success:", data);
      toast.success("Government Registered successfully");
      form.reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid w-full gap-6"
      >
        {/* Name + Email */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Government Department Name"
                    {...field}
                    className="text-white bg-gray-700 border-gray-600 focus-visible:ring-green-500/40 focus-visible:border-green-500"
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
        </div>

        {/* Role Select */}
        <FormField
          control={form.control}
          name="role"
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Role</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="text-white bg-gray-700 border-gray-600 focus-visible:ring-green-500/40 focus-visible:border-green-500">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-white bg-gray-800 border-gray-700">
                  <SelectItem value="central">Central</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

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
          <FormField
            control={form.control}
            name="walletId"
            rules={{ required: "Wallet ID is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-300">Wallet ID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Connect your wallet"
                    readOnly
                    {...field}
                    className="text-white bg-gray-700 border-gray-600 focus-visible:ring-green-500/40 focus-visible:border-green-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="button"
            onClick={connectWallet}
            className="w-full text-black bg-green-500 shadow-md hover:bg-green-500/90 focus-visible:ring-green-500/40 hover:shadow-lg"
          >
            Connect Wallet
          </Button>
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          rules={{ required: "Address is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-300">Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Department address"
                  {...field}
                  className="text-white bg-gray-700 border-gray-600 focus-visible:ring-green-500/40 focus-visible:border-green-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Location Picker */}
        <FormLabel className="text-gray-300">Location</FormLabel>
        <LocationPicker form={form} />

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
