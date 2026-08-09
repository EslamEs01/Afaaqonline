const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || "/api").replace(/\/$/, "");


export class ApiError extends Error {
  constructor(message: string, public readonly details?: unknown) {
    super(message);
    this.name = "ApiError";
  }
}


function firstError(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  for (const value of Object.values(payload as Record<string, unknown>)) {
    if (typeof value === "string") return value;
    if (Array.isArray(value) && typeof value[0] === "string") return value[0];
  }
  return null;
}


export async function postToApi<T>(path: string, payload: unknown): Promise<T> {
  const response = await fetch(`${API_BASE_URL}/${path.replace(/^\//, "")}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(
      firstError(data) || "تعذر إرسال البيانات الآن. تحقق من الاتصال وحاول مرة أخرى.",
      data,
    );
  }
  return data as T;
}
