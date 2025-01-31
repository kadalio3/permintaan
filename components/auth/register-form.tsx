"use client";
import { useActionState } from "react";
import { DaftarCredentials } from "@/lib/actions";
import { useState } from "react";
import { TombolDaftar } from "../tombol";

const RegisterForm = () => {
  const [state, formAction] = useActionState(DaftarCredentials, null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      await formAction(formData);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function untuk menampilkan error
  const getErrorMessage = (field: string) => {
    const errorMessages = state?.error?.[field];
    return Array.isArray(errorMessages) ? errorMessages[0] : errorMessages;
  };

  return (
    <form action={onSubmit} className="space-y-4" autoComplete="off">
      {state?.message ? (
        <div
          className="flex justify-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state?.message}</span>
        </div>
      ) : null}
      <div className="relative">
        {getErrorMessage("username") && (
          <p className="text-red-500 text-xs mb-1">
            {getErrorMessage("username")}
          </p>
        )}

        <input
          type="text"
          id="username"
          name="username"
          required
          disabled={isLoading}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder=" "
        />
        <label
          htmlFor="username"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 left-1"
        >
          Username
        </label>
      </div>

      <div className="relative">
        {getErrorMessage("email") && (
          <p className="text-red-500 text-xs mb-1">
            {getErrorMessage("email")}
          </p>
        )}
        <input
          type="email"
          id="email"
          name="email"
          required
          disabled={isLoading}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder=" "
        />
        <label
          htmlFor="email"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 left-1"
        >
          Email
        </label>
      </div>

      <div className="relative">
        {getErrorMessage("password") && (
          <p className="text-red-500 text-xs mb-1">
            {getErrorMessage("password")}
          </p>
        )}
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          disabled={isLoading}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder=" "
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 left-1"
        >
          Password
        </label>
      </div>

      <div className="relative">
        {getErrorMessage("ConfirmPassword") && (
          <p className="text-red-500 text-xs mb-1">
            {getErrorMessage("ConfirmPassword")}
          </p>
        )}
        <input
          type="password"
          id="confirmPassword"
          name="ConfirmPassword"
          required
          disabled={isLoading}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder=" "
        />
        <label
          htmlFor="confirmPassword"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:-translate-y-4 left-1"
        >
          Confirm Password
        </label>
      </div>
      <TombolDaftar />
    </form>
  );
};

export default RegisterForm;
