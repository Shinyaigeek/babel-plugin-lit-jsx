import { writeFileSync } from "fs";

export const fileWriter = (source: string, dist: string) => {
  return writeFileSync(dist, source);
};
