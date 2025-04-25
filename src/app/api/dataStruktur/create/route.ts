import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const nama = formData.get("nama") as string;
    const jabatan = formData.get("jabatan") as string;
    const divisi_id = formData.get("divisi_id") as string;
    const gambar = formData.get("gambar") as File | null;

    const dataToSend = new FormData();
    dataToSend.append("nama", nama);
    dataToSend.append("jabatan", jabatan);
    dataToSend.append("divisi_id", divisi_id);
    if (gambar) {
      dataToSend.append("gambar", gambar);
    }

    const response = await axiosInstance.post("/api/struktur", dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
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
