"use server";

export async function syncDataAction() {
  try {
    const res = await fetch("https://inhforhumanity.org/api/transactions/sync", {
      method: "GET",
      // kalau perlu kirim cookie/session bisa tambahkan:
      // credentials: "include",
      // headers: { "Content-Type": "application/json" },
      cache: "no-store", // biar gak di-cache
    });

    if (!res.ok) {
      throw new Error(`Request gagal: ${res.status}`);
    }

    const data = await res.json();

    return { success: true, data };
  } catch (error) {
    console.error("Gagal sinkronisasi:", error);
    return { success: false, message: "Gagal sinkronisasi ke server" };
  }
}
