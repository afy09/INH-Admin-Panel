"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Campign = ({ dataCampign }: { dataCampign: any }) => {
  return (
    <div className="border rounded-t-2xl">
      <div className="flex justify-between mt-3">
        <h1 className="text-black-2 px-4 py-3 font-semibold text-xl">
          Data <span className="text-black-2">Campaign</span>
        </h1>

        <Link href="/dashboard/campign/tambah">
          <div className="px-4 py-3">
            <button className="bg-amber-400 px-6 py-2 text-white rounded-lg">Tambah</button>
          </div>
        </Link>
      </div>
      <div className="w-full">
        {dataCampign && dataCampign.length > 0 ? (
          <table className="w-full">
            <thead className="bg-amber-50 text-[#252525] font-light text-[14px] rounded-lg">
              <tr>
                <th className="font-normal p-3">No</th>
                <th className="font-normal p-3">Judul</th>
                <th className="font-normal p-3">Banner</th>
                <th className="font-normal p-3">Kategori</th>
                <th className="font-normal p-3">Tanggal Dibuat</th>
                <th className="font-normal p-3">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {dataCampign.map((member: any, index: number) => (
                <tr key={member.id} className="text-center text-black-2 text-[13px] border">
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{member.title}</td>
                  <td className="p-3 flex justify-center">
                    <img src={member.image} alt={member.title} className="w-20 h-auto" />
                  </td>
                  <td className="p-3 capitalize">{member.kategori}</td>
                  <td className="p-3">{new Date(member.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-amber-700 ">
                    <Link href={`/dashboard/campign/detail.tsx/${member?.id}`}>Detail</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>Tidak ada data</div>
        )}
      </div>
    </div>
  );
};

export default Campign;
