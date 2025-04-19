import axiosInstance from "@/libs/axiosInstance";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const link_banner = formData.get("link_banner") as string;
    const valid = formData.get("valid") as string;
    const image = formData.get("image") as File | null;

    const dataToSend = new FormData();
    dataToSend.append("link_banner", link_banner);
    dataToSend.append("valid", valid);
    if (image) {
      dataToSend.append("image", image);
    }

    const response = await axiosInstance.post("/api/banners", dataToSend, {
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
