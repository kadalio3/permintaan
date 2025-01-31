"use client";

import { useState } from "react";
import TambahSuratMasukForm from "@/components/surat/masuk/tambah-surat-form";

// Helper function untuk format tanggal
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

// Helper function untuk format tanggal dan waktu
function formatDateTime(date: Date) {
  return new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SuratMasukPage({ suratMasuk }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Surat Masuk</h1>
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
                <th className="px-6 py-3">Asal Surat</th>
                <th className="px-6 py-3">Perihal</th>
                <th className="px-6 py-3">Tanggal Surat</th>
                <th className="px-6 py-3">Tanggal Terima</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Dibuat</th>
                <th className="px-6 py-3">Diupdate</th>
                <th className="px-6 py-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {suratMasuk.map((surat) => (
                <tr
                  key={surat.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {surat.noSurat}
                  </td>
                  <td className="px-6 py-4">{surat.asalSurat}</td>
                  <td className="px-6 py-4">{surat.prihal}</td>
                  <td className="px-6 py-4">{formatDate(surat.tanggalSurat)}</td>
                  <td className="px-6 py-4">
                    {formatDate(surat.tanggalTerimaSurat)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {surat.status.namaStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">{formatDateTime(surat.createdAt)}</td>
                  <td className="px-6 py-4">{formatDateTime(surat.updatedAt)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <TambahSuratMasukForm isOpen={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
