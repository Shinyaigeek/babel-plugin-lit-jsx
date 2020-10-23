import { parse } from "@babel/parser";
import { join } from "path";
import { fileReader } from "../../../io/src/modules/file/fileReader/fileReader";

export const astParser = (entry: string) => {
  const source = fileReader(entry);

  return parse(source, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
};
