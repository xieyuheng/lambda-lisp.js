import { spawnSync } from "node:child_process"

type Result = {
  status: number | null
  stdout: string
  stderr: string
}

export function systemShellCapture(name: string, args: Array<string>): Result {
  const result = spawnSync([name, ...args].join(" "), { shell: true })
  return {
    status: result.status,
    stdout: result.stdout.toString(),
    stderr: result.stderr.toString(),
  }
}

export function systemShellRun(name: string, args: Array<string>): void {
  const { status, stdout, stderr } = systemShellCapture(name, args)
  if (stdout !== "") process.stdout.write(stdout)
  if (stderr !== "") process.stderr.write(stderr)
  if (status !== 0) process.exit(status)
}
