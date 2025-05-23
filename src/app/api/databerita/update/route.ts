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

    const kategori = formData.get("category_id") as string;
    const author = formData.get("user_id") as string;
    const caption = formData.get("caption") as string;
    const deskripsi = formData.get("deskripsi");
    const image = formData.get("image") as File | null;

    const dataToSend = new FormData();

    if (method) {
      dataToSend.append("_method", method);
    }
    if (typeof title === "string") {
      dataToSend.append("title", title);
    }
    if (author) {
      dataToSend.append("user_id", author);
    }
    if (kategori) {
      dataToSend.append("category_id", kategori);
    }

    if (typeof caption === "string") {
      dataToSend.append("caption", caption);
    }
    if (typeof deskripsi === "string") {
      dataToSend.append("deskripsi", deskripsi);
    }
    if (image && image instanceof File) {
      dataToSend.append("image", image);
    }

    const response = await axiosInstance.post(`/api/news/${id}`, dataToSend, {
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
