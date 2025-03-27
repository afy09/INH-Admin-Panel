"use client";
import { fetchAdmin } from "@/app/api/AdminProfile/getProfile";
import { DataAdmin } from "@/models/DataAdmin";
import React, { createContext, useContext } from "react";

export default async function getAdmin() {
  const dataAdmin = await fetchAdmin();
  return dataAdmin;
}

const useAdminController = (dataAdmin: DataAdmin) => {
  return {
    dataAdmin,
  };
};

const DataAdminContext = createContext<ReturnType<typeof useAdminController>>({
  dataAdmin: {
    name: "",
    email: "",
    role: "",
  },
});

export const DataAdminProvider = ({ dataAdmin, children }: { dataAdmin: DataAdmin; children: React.ReactNode }) => {
  return <DataAdminContext.Provider value={useAdminController(dataAdmin)}>{children}</DataAdminContext.Provider>;
};

export const useAdmin = () => useContext(DataAdminContext);
