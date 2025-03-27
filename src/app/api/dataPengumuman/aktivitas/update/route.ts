import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Parse JSON dari body request
    const body = await req.json();
    const { url } = body;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    const response = await axiosInstance.put(
      `/api/aktivitas-terbaru/${id}`,
      { url },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(
      {
        message: "Updated successfully",
        result: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating:", error);

    // Tangkap pesan error dari backend
    const errorMessage = error.response?.data?.message || "Internal Server Error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
