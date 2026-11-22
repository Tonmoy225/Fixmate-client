import { getSession } from "@/lib/session";

export async function POST(request) {
  // শুধু লগইন করা user ছবি তুলতে পারবে
  const session = await getSession();
  if (!session) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("image");

  if (!file || typeof file === "string") {
    return Response.json({ message: "Image file is required" }, { status: 400 });
  }
  if (!file.type.startsWith("image/")) {
    return Response.json({ message: "Only image files are allowed" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return Response.json({ message: "Image must be smaller than 5 MB" }, { status: 400 });
  }

  const body = new FormData();
  body.append("image", file);

  const res = await fetch(
    `https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`,
    { method: "POST", body }
  );
  const data = await res.json().catch(() => null);

  if (!res.ok || !data?.success) {
    return Response.json({ message: "Image upload failed" }, { status: 500 });
  }

  return Response.json({ url: data.data.url });
}