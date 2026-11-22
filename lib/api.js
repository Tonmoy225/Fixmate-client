const API = process.env.NEXT_PUBLIC_API_URL || "";

// লগইন করা user-এর JWT নেওয়া (Next.js এর /api/token থেকে)
export async function getToken() {
  try {
    const res = await fetch("/api/token");
    if (!res.ok) return null;
    const data = await res.json();
    return data.token || null;
  } catch {
    return null;
  }
}

// Express server-এ token সহ request
export async function apiFetch(path, options = {}) {
  const token = await getToken();

  if (!token) {
    throw new Error("Your session has expired. Please sign in again.");
  }

  let res;
  try {
    res = await fetch(`${API}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });
  } catch {
    // Network/CORS error হলে fetch নিজেই throw করে (TypeError: Failed to fetch)
    throw new Error(
      "Could not reach the server. Please check your connection and try again."
    );
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}
// ছবি upload করে ImgBB-র URL ফেরত দেয়
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch("/api/upload", { method: "POST", body: formData });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Image upload failed");
  }

  return data.url;
}