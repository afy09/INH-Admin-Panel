import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nama, url } = body;

    // Buat objek hanya dengan field yang ada
    const dataToSend: Record<string, any> = {};
    if (nama) dataToSend.nama = nama;
    if (url) dataToSend.url = url;

    const response = await axiosInstance.post(`/api/aktivitas-terbaru`, dataToSend, {
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
