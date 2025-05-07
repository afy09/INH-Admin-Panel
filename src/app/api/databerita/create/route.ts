import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const author = formData.get("user_id") as string;
    const caption = formData.get("caption") as string;
    const kategori = formData.get("category_id") as string;
    const deskripsi = formData.get("deskripsi") as string;
    const image = formData.get("image") as File | null;

    const dataToSend = new FormData();
    dataToSend.append("title", title);
    dataToSend.append("user_id", author);
    dataToSend.append("category_id", kategori);
    dataToSend.append("caption", caption);
    dataToSend.append("deskripsi", deskripsi);
    if (image) {
      dataToSend.append("image", image);
    }

    const response = await axiosInstance.post("/api/news", dataToSend, {
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
