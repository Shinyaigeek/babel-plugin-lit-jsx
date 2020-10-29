import { parse } from "@babel/parser";
import { fileReader } from "../fileReader/fileReader";

export const astParser = (entry: string) => {
  const source = fileReader(entry);

  return parse(source, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
};
