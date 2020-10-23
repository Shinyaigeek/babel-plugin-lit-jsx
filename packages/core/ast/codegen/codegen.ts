import { File } from "@babel/types";
import generate from "@babel/generator";

export const codegen = (ast: File) => {
  const { code } = generate(ast);
  return code;
};
