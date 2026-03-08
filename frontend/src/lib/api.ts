// frontend/src/lib/api.ts
import { getToken } from "./auth"

const BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"

type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

async function request<T>(method: Method, path: string, body?: unknown): Promise<T> {
    const token = getToken()
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: res.statusText }))
        throw new Error((err as { message?: string }).message ?? `Request failed: ${res.status}`)
    }
    return res.json() as Promise<T>
}

export const api = {
    get: <T>(path: string) => request<T>("GET", path),
    post: <T>(path: string, body: unknown) => request<T>("POST", path, body),
    patch: <T>(path: string, body?: unknown) => request<T>("PATCH", path, body),
    del: <T>(path: string) => request<T>("DELETE", path),
}
