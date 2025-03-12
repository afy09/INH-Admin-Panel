import React from "react";
import TambahCampagn from "@/components/Campign/tambah-campaign";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel INH | Tambah Campaign",
};

export default function page() {
  return (
    <div>
      <TambahCampagn />
    </div>
  );
}
