import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Ambil data dari FormData dan pastikan untuk memeriksa null
    const name = formData.get("name") as string;
    const image = formData.get("image") as File | null;
    const dataToSend = new FormData();
    dataToSend.append("name", name);

    if (image) {
      dataToSend.append("image", image);
    }

    const response = await axiosInstance.post("/api/lembaga_kerjasama", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data", // Pastikan header ini disertakan
      },
    });

    return NextResponse.json(
      {
        message: "Uploaded successfully",
        result: response.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading:", error);
    return NextResponse.json({ message: "Error uploading" }, { status: 500 });
  }
}
