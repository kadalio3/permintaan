"use client";
import { useState } from "react";

export const TombolDaftar = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Loading..." : "Register"}
    </button>
  );
};

export const TombolMasuk = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? "Loading..." : "Login"}
    </button>
  );
};
