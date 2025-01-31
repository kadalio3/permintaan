"use client";

import { useState, useEffect } from "react";
import { getSuratMasukFiltered, getStatusSurat } from "@/lib/surat";
import { formatDate } from "@/lib/date";

interface Status {
  id: string;
  namaStatus: string;
}

interface SuratMasuk {
  id: string;
  noSurat: string;
  asalSurat: string;
  prihal: string;
  tanggalSurat: Date;
  tanggalTerimaSurat: Date;
  status: Status;
}

export default function LaporanSuratMasukPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatusId, setSelectedStatusId] = useState("");
  const [statusOptions, setStatusOptions] = useState<Status[]>([]);
  const [suratMasuk, setSuratMasuk] = useState<SuratMasuk[]>([]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const statusList = await getStatusSurat();
        setStatusOptions(statusList || []);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };
    fetchStatus();
  }, []);

  useEffect(() => {
    const fetchFilteredSurat = async () => {
      try {
        const filteredSurat = await getSuratMasukFiltered({
          statusId: selectedStatusId,
          searchQuery,
        });
        setSuratMasuk(filteredSurat || []);
      } catch (error) {
        console.error("Error fetching surat masuk:", error);
      }
    };
    fetchFilteredSurat();
  }, [searchQuery, selectedStatusId]);

  return (
    <div className="p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Laporan Surat Masuk</h1>
        
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="text"
            placeholder="Cari surat..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={selectedStatusId}
            onChange={(e) => setSelectedStatusId(e.target.value)}
          >
            <option value="">Semua Status</option>
            {statusOptions.map((status) => (
              <option key={status.id} value={status.id}>
                {status.namaStatus}
              </option>
            ))}
          </select>
        </div>
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
              </tr>
            </thead>
            <tbody>
              {suratMasuk.map((surat) => (
                <tr key={surat.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{surat.noSurat}</td>
                  <td className="px-6 py-4">{surat.asalSurat}</td>
                  <td className="px-6 py-4">{surat.prihal}</td>
                  <td className="px-6 py-4">{formatDate(surat.tanggalSurat)}</td>
                  <td className="px-6 py-4">{formatDate(surat.tanggalTerimaSurat)}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                      {surat.status.namaStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}