import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id"); // Ambil ID dari URL
    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const body = await req.json();
    const { nama, nominal, no_hp, tujuan_donasi, tanggal } = body;

    // Buat objek hanya dengan field yang ada
    const dataToSend: Record<string, any> = {};
    if (nama) dataToSend.nama = nama;
    if (nominal) dataToSend.nominal = nominal;
    if (no_hp) dataToSend.no_hp = no_hp;
    if (tujuan_donasi) dataToSend.tujuan_donasi = tujuan_donasi;
    if (tanggal) dataToSend.tanggal = tanggal;

    const response = await axiosInstance.put(`/api/donasi/${id}`, dataToSend, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(
      {
        message: "Updated successfully",
        result: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating:", error);
    const errorMessage = error.response?.data?.message || "Error updating";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
