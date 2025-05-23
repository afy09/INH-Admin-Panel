"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingSpiner } from "./icons/icon";
import { FaPlus } from "react-icons/fa6";
import NoDataImage from "../NoData/NoDataImage";
import { useRouter } from "next/navigation";

const Campign = ({ dataCampign, currentPage, lastPage }: { dataCampign: any; currentPage: number; lastPage: number }) => {
  // const [dataCampign, setDataCampign] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("page", newPage.toString());
    router.push(`?${urlParams.toString()}`);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/campaign`);
  //       const result = await response.json();

  //       if (response.ok) {
  //         setDataCampign(result.data);
  //       } else {
  //         throw new Error(result.message || "Failed to fetch data");
  //       }
  //     } catch (err: any) {
  //       setError(err.message || "An error occurred");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center mt-3">
  //       <LoadingSpiner />
  //     </div>
  //   );
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="border rounded-t-2xl">
      <div className="flex justify-between mt-3">
        <h1 className="text-black-2 px-4 py-3 font-semibold text-xl">
          Data <span className="text-black-2">Campaign</span>
        </h1>

        <Link href="/dashboard/campign/tambah">
          <div className="px-4 py-3">
            <button className="bg-amber-400 px-6 py-2 text-white rounded-lg flex justify-center gap-2 items-center">
              <FaPlus />
              Tambah
            </button>
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
          <NoDataImage />
        )}
      </div>

      {dataCampign && dataCampign.length > 0 && (
        <div className="flex justify-end items-center mt-6 mb-3 me-2 text-[12px]">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className={`px-4 py-2 mx-1 rounded ${currentPage <= 1 ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white cursor-pointer"}`}>
            Prev
          </button>
          <span className="px-4 py-2 mx-1 text-primary border border-primary rounded">{`Page ${currentPage} of ${lastPage}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= lastPage}
            className={`px-4 py-2 mx-1 rounded  ${currentPage >= lastPage ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-primary text-white cursor-pointer"}`}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Campign;
