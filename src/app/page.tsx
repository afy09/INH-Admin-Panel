import React from "react";
import { Metadata } from "next";
import SignIn from "./auth/signin/page";

export const metadata: Metadata = {
  title: "Admin Panel INH",
  description: "Internatinal Networking Humantarian",
};

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}
