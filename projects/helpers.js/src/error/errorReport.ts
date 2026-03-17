export function errorReport(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  } else {
    return `unknown error: ${error}`
  }
}
