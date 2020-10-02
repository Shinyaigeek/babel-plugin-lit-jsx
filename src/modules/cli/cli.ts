import { exec } from "child_process";

export const cli = (args: string[], cwd: string, target: string) => {
  return new Promise((resolve) => {
    exec(`node ${target} ${args.join(" ")}`, { cwd }, (err, stdout, stderr) => {
      resolve({
        code: err && err.code ? err.code : 0,
        err,
        stdout,
        stderr,
      });
    });
  });
};
