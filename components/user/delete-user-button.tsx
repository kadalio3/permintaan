"use client";

import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface DeleteUserButtonProps {
  userId: string;
  username: string;
}

const DeleteUserButton = ({ userId, username }: DeleteUserButtonProps) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`/api/user/${userId}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        setError(data.message || "Failed to delete user");
        return;
      }

      setShowModal(false);
      router.refresh(); // Refresh halaman untuk update data
    } catch (err) {
      setError("An error occurred while deleting user");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-600 hover:text-red-800 font-medium"
      >
        <FiTrash2 className="h-4 w-4" />
      </button>

      {/* Modal Backdrop */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="bg-white rounded-lg w-full max-w-[480px] shadow-lg">
            <div className="p-4 text-center">
              {/* Warning Icon */}
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-lg font-medium mb-2">
                Delete User
              </h3>
              <p className="text-[13px] text-gray-600 mb-6 whitespace-nowrap">
                Are you sure you want to delete user? This action cannot be undone.
              </p>

              {error && (
                <div className="mb-4 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-sm font-normal text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-sm font-normal text-white bg-red-600 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteUserButton; 