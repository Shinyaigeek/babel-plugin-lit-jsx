import { astParser } from "lit-jsx-core/visitor/astParser/astParser";
import { codegen } from "../codegen/codegen";
import { convertTsx2TemplateLiteral } from "lit-jsx-core/visitor/convertTsx2TemplateLiteral/convertTsx2TemplateLiteral";

export const compileEachFile = (target: string) => {
  const ast = astParser(target);

  convertTsx2TemplateLiteral(ast, target);

  console.log(codegen(ast));
};
