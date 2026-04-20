const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8080";

async function readJson(pathname) {
  const url = `${API_BASE_URL}${pathname}`;

  let response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      `Cannot reach the backend API at ${API_BASE_URL}. Start the Express server on port 8080.`,
    );
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message ?? "Request failed.");
  }

  return payload;
}

export async function fetchBlogList() {
  const payload = await readJson("/api/blogs");
  return payload.data ?? [];
}

export async function fetchBlogDetail(identifier) {
  const encodedIdentifier = encodeURIComponent(identifier);
  const payload = await readJson(`/api/blogs/${encodedIdentifier}`);
  return payload.data ?? null;
}
