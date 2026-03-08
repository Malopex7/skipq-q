// frontend/src/lib/auth.ts
const TOKEN_KEY = "skipq_token"

export const getToken = (): string | null =>
    typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null

export const setToken = (token: string): void => {
    if (typeof window !== "undefined") localStorage.setItem(TOKEN_KEY, token)
}

export const clearToken = (): void => {
    if (typeof window !== "undefined") localStorage.removeItem(TOKEN_KEY)
}
