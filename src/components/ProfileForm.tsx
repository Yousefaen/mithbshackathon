"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the form schema with more complex validation
const profileSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { 
      message: "Username can only contain letters, numbers and underscores" 
    }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  bio: z
    .string()
    .max(160, { message: "Bio cannot exceed 160 characters" })
    .optional(),
  age: z
    .number({ invalid_type_error: "Please enter a valid age" })
    .int()
    .positive()
    .min(18, { message: "You must be at least 18 years old" }),
  website: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .optional()
    .or(z.literal("")),
  agreeToTerms: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms and conditions" }),
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "",
      website: "",
      agreeToTerms: false,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    // Simulate API call
    console.log("Profile form submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    alert("Profile updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="fullName"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="fullName"
          type="text"
          {...register("fullName")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="username"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          {...register("username")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.username && (
          <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="age"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Age
        </label>
        <input
          id="age"
          type="number"
          {...register("age", { valueAsNumber: true })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.age && (
          <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="bio"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Bio
        </label>
        <textarea
          id="bio"
          {...register("bio")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          rows={3}
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="website"
          className="mb-1 block text-sm font-medium text-gray-700"
        >
          Website (optional)
        </label>
        <input
          id="website"
          type="url"
          {...register("website")}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {errors.website && (
          <p className="mt-1 text-sm text-red-600">{errors.website.message}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="agreeToTerms"
          type="checkbox"
          {...register("agreeToTerms")}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label
          htmlFor="agreeToTerms"
          className="ml-2 block text-sm text-gray-700"
        >
          I agree to the terms and conditions
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="mt-1 text-sm text-red-600">{errors.agreeToTerms.message}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-gray-800 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:bg-gray-400"
      >
        {isSubmitting ? "Updating Profile..." : "Update Profile"}
      </button>
    </form>
  );
}
