"use client";

import { useState, useEffect } from "react";
import { TambahSuratKeluar } from "@/app/api/surat/route";

interface TambahSuratKeluarFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editData?: SuratKeluar | null;
  onUpdate?: (formData: FormData) => Promise<void>;
}

export default function TambahSuratKeluarForm({ 
  isOpen, 
  onClose,
  onSuccess,
  editData,
  onUpdate 
}: TambahSuratKeluarFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editData) {
      const form = document.querySelector('form');
      if (form) {
        (form.elements.namedItem('noSurat') as HTMLInputElement).value = editData.noSurat;
        (form.elements.namedItem('prihalSurat') as HTMLInputElement).value = editData.prihalSurat;
        (form.elements.namedItem('tanggalSurat') as HTMLInputElement).value = 
          new Date(editData.tanggalSurat).toISOString().split('T')[0];
      }
    }
  }, [editData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      
      if (editData && onUpdate) {
        await onUpdate(formData);
        onSuccess();
        onClose();
      } else {
        const response = await TambahSuratKeluar(formData);
        if (response.success) {
          onSuccess();
          onClose();
        } else {
          setError(response.message || "Terjadi kesalahan");
        }
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menyimpan data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {editData ? 'Edit Surat Keluar' : 'Tambah Surat Keluar'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nomor Surat
              </label>
              <input
                type="text"
                name="noSurat"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan nomor surat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Perihal Surat
              </label>
              <input
                type="text"
                name="prihalSurat"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Masukkan perihal surat"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tanggal Surat
              </label>
              <input
                type="date"
                name="tanggalSurat"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
              >
                {isLoading ? "Menyimpan..." : (editData ? "Update" : "Simpan")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}