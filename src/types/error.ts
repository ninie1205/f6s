export interface ErrorDetail {
  message?: string,
  code?: string,
  loc?: string[],
  msg?: string,
  type?: string
}

export interface ShyftError extends Error {
  detail: string | ErrorDetail
}
