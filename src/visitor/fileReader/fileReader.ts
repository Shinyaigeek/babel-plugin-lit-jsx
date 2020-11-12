import { readFileSync } from "fs";

export const fileReader = (target: string) => {
  return readFileSync(target, "utf-8");
};
