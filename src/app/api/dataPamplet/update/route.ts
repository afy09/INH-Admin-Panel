import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const formData = await req.formData();
    const image = formData.get("image") as File | null;
    const link = formData.get("link") as string;

    const dataToSend = new FormData();

    if (link && link) {
      dataToSend.append("link", link);
    }
    if (image && image instanceof File) {
      dataToSend.append("image", image);
    }

    const response = await axiosInstance.put(`/api/pamplets/${id}`, dataToSend, {
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
