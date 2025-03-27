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
    const { nama, kode_tracking } = body;

    // Buat objek hanya dengan field yang ada
    const dataToSend: Record<string, any> = {};
    if (nama) dataToSend.nama = nama;
    if (kode_tracking) dataToSend.kode_tracking = kode_tracking;

    const response = await axiosInstance.put(`/api/kode_tracking/${id}`, dataToSend, {
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
