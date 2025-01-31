"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AddUsers } from "@/app/api/user/route";

const initialState = {
  error: {},
  message: "",
};

export default function AddUserForm() {
  const router = useRouter();
  const [state, formAction] = useActionState(AddUsers, initialState);

  useEffect(() => {
    if (state?.success) {
      router.push("/user");
      router.refresh();
    }
  }, [state?.success, router]);

  return (
    <form action={formAction} className="space-y-6">
      <div className="relative">
        <input
          type="text"
          name="username"
          id="username"
          required
          className="block px-4 py-2.5 w-full text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer"
          placeholder=" "
        />
        <label
          htmlFor="username"
          className="absolute text-sm text-gray-500 bg-white px-2 left-2 -top-2.5"
        >
          Username
        </label>
        {state?.error?.username && (
          <p className="mt-1 text-sm text-red-500">{state.error.username}</p>
        )}
      </div>

      <div className="relative">
        <input
          type="email"
          name="email"
          id="email"
          required
          className="block px-4 py-2.5 w-full text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-gray-500 bg-white px-2 left-2 -top-2.5"
        >
          Email
        </label>
        {state?.error?.email && (
          <p className="mt-1 text-sm text-red-500">{state.error.email}</p>
        )}
      </div>

      <div className="relative">
        <input
          type="password"
          name="password"
          id="password"
          required
          className="block px-4 py-2.5 w-full text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-gray-500 bg-white px-2 left-2 -top-2.5"
        >
          Password
        </label>
        {state?.error?.password && (
          <p className="mt-1 text-sm text-red-500">{state.error.password}</p>
        )}
      </div>

      <div className="relative">
        <input
          type="password"
          name="ConfirmPassword"
          id="ConfirmPassword"
          required
          className="block px-4 py-2.5 w-full text-gray-900 bg-transparent border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-0 focus:border-orange-500 peer"
          placeholder=" "
        />
        <label
          htmlFor="ConfirmPassword"
          className="absolute text-sm text-gray-500 bg-white px-2 left-2 -top-2.5"
        >
          Confirm Password
        </label>
        {state?.error?.ConfirmPassword && (
          <p className="mt-1 text-sm text-red-500">{state.error.ConfirmPassword}</p>
        )}
      </div>

      {state?.message && (
        <p className={`text-sm ${state.success ? 'text-green-500' : 'text-red-500'}`}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        className="w-full px-4 py-2.5 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Add User
      </button>
    </form>
  );
} 