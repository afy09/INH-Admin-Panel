import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const formData = await req.formData();
    const method = formData.get("_method");
    const title = formData.get("title");

    const kategori = formData.get("kategori") as string;
    const author = formData.get("author") as string;
    const deskripsi = formData.get("deskripsi");
    const image = formData.get("image") as File | null;

    const dataToSend = new FormData();

    if (method) {
      dataToSend.append("_method", method);
    }
    if (author) {
      dataToSend.append("author", author);
    }
    if (typeof title === "string") {
      dataToSend.append("title", title);
    }
    if (typeof kategori === "string") {
      dataToSend.append("kategori", kategori);
    }

    if (typeof deskripsi === "string") {
      dataToSend.append("deskripsi", deskripsi);
    }
    if (image && image instanceof File) {
      dataToSend.append("image", image);
    }

    const response = await axiosInstance.post(`/api/distribusi-program/${id}`, dataToSend, {
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
  } catch (error: any) {
    console.error("Error uploading:", error);
    const errorMessage = error.response?.data?.message || "Error uploading file";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
