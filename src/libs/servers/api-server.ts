import { getSession } from "../sessions/session.service";

// services/http.ts
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod;
  body?: TBody;
  headers?: HeadersInit;
  params?: Record<string, string | number | boolean | undefined>;
}

const BASE_URL = process.env.INTERNAL_API_URL ?? "";
const session = await getSession();

export default async function apiServer<TResponse, TBody = unknown>(
  url: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const {
    method = "GET",
    body,
    headers,
    params,
  } = options;

  const queryString = params
    ? "?" +
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`)
        .join("&")
    : "";

  const res = await fetch(`${BASE_URL}${url}${queryString}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
    
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => null);
    throw {
      status: res.status,
      message: errorBody?.message ?? res.statusText,
      data: errorBody,
    };
  }

  return res.json();
}
