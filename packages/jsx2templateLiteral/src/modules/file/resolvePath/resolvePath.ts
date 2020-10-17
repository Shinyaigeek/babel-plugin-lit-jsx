import { existsSync } from "fs";
import { resolve } from "path";

const supportedFile = [".tsx", ".jsx"];

export const resolvePath = (absPath: string, rel: string) => {
  const basePath = isAbsolutePathIncludesFileExtension(absPath)
    ? absPath.split("/").slice(0, -1).join("/")
    : absPath;

  if (isAbsolutePathIncludesFileExtension(rel)) {
    return resolve(basePath, rel);
  }

  for (let file of supportedFile) {
    const p = resolve(basePath, rel + file);

    if (existsSync(p)) {
      return p;
    }
  }
};

const isAbsolutePathIncludesFileExtension = (absPath: string) => {
  return supportedFile.some((file) => {
    return file === absPath.slice(-1 * file.length);
  });
};
