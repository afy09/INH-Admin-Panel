import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // karena dari frontend dikirim sebagai JSON
    const { name, email, role, password } = body;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        role,
        password,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      return NextResponse.json({ message: "Gagal upload", error: result }, { status: response.status });
    }

    return NextResponse.json(
      {
        message: "Uploaded successfully",
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading:", error);
    return NextResponse.json({ message: "Error uploading" }, { status: 500 });
  }
}
