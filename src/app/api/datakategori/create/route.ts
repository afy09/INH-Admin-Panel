import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Ambil data dalam format JSON
    const { kategori } = body;

    const response = await axiosInstance.post("/api/categories", body, {
      headers: {
        "Content-Type": "application/json", // Kirim data dalam format JSON
      },
    });

    return NextResponse.json(
      {
        message: "Uploaded successfully",
        result: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error uploading:", error);
    const errorMessage = error.response?.data?.message || "Error uploading";

    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
