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
    const valid = formData.get("valid");
    const link_pengumuman = formData.get("link_pengumuman") as string | null;
    const image = formData.get("image") as File | null;

    const dataToSend = new FormData();

    if (method) {
      dataToSend.append("_method", method);
    }

    if (link_pengumuman) {
      dataToSend.append("link_pengumuman", link_pengumuman);
    }
    if (typeof valid === "string") {
      dataToSend.append("valid", valid);
    }

    if (image && image instanceof File) {
      dataToSend.append("image", image);
    }

    const response = await axiosInstance.post(`/api/pengumuman/${id}`, dataToSend, {
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
