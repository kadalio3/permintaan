"use client";

import { useState } from "react";
import { getSuratKeluar } from "@/lib/surat";
import TambahSuratKeluarForm from "@/components/surat/keluar/tambah-surat-form";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { deleteSuratKeluar, UpdateSuratKeluar } from "@/app/api/surat/route";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SuratKeluarPage({ suratKeluar: initialSuratKeluar }: { suratKeluar: SuratKeluar[] }) {
  const [showForm, setShowForm] = useState(false);
  const [suratKeluar, setSuratKeluar] = useState(initialSuratKeluar);
  const [editingSurat, setEditingSurat] = useState<SuratKeluar | null>(null);
  
  const fetchData = async () => {
    try {
      const data = await getSuratKeluar();
      if (data) {
        setSuratKeluar(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSuccess = () => {
    fetchData();
  };

  const handleEdit = (surat: SuratKeluar) => {
    setEditingSurat(surat);
    setShowForm(true);
  };

  const handleUpdate = async (formData: FormData) => {
    try {
      const result = await UpdateSuratKeluar(editingSurat!.id, formData);
      if (result.success) {
        fetchData(); // Refresh data setelah update
        setShowForm(false);
        setEditingSurat(null);
      } else {
        alert(result.message || "Gagal mengupdate surat");
      }
    } catch (error) {
      console.error('Error updating surat:', error);
      alert("Terjadi kesalahan saat mengupdate surat");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus surat ini?")) {
      return;
    }

    try {
      const result = await deleteSuratKeluar(id);
      if (result.success) {
        fetchData(); // Refresh data setelah hapus
      } else {
        alert(result.message || "Gagal menghapus surat");
      }
    } catch (error) {
      console.error('Error deleting surat:', error);
      alert("Terjadi kesalahan saat menghapus surat");
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Surat Keluar</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Tambah Surat
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">No. Surat</th>
                <th className="px-6 py-3">Perihal</th>
                <th className="px-6 py-3">Tanggal Surat</th>
                <th className="px-6 py-3">Dibuat</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {suratKeluar.map((surat:SuratKeluar) => (
                <tr
                  key={surat.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {surat.noSurat}
                  </td>
                  <td className="px-6 py-4">{surat.prihalSurat}</td>
                  <td className="px-6 py-4">{formatDate(surat.tanggalSurat)}</td>
                  <td className="px-6 py-4">{formatDateTime(surat.dibuat)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <button 
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleEdit(surat)}
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(surat.id)}
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TambahSuratKeluarForm 
        isOpen={showForm} 
        onClose={() => {
          setShowForm(false);
          setEditingSurat(null);
        }}
        onSuccess={handleSuccess}
        editData={editingSurat}
        onUpdate={handleUpdate}
      />
    </div>
  );
}