import fs from "node:fs"
import type { File } from "./File.ts"

export function fileRead(file: File): string {
  const { size } = fs.fstatSync(file.fd)
  const buffer = Buffer.alloc(size)
  const readSize = fs.readSync(file.fd, buffer)
  if (readSize !== size) {
    let message = `[fileRead] fail to fully read`
    message += `\n   fd: ${file.fd}`
    message += `\n   size: ${size}`
    message += `\n   readSize: ${readSize}`
    throw new Error(message)
  }

  return buffer.toString("utf-8")
}
