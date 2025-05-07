import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const response = await axiosInstance.delete(`/api/categories/${id}`, {
      headers: {
        "Content-Type": "application/json",
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
