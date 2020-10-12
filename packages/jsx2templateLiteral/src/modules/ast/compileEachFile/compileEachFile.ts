import { astParser } from "../astParser/astParser";
import { codegen } from "../codegen/codegen";
import { convertTsx2TemplateLiteral } from "../convertTsx2TemplateLiteral/convertTsx2TemplateLiteral";

export const compileEachFile = (target: string) => {
  const ast = astParser(target);

  const result = convertTsx2TemplateLiteral(ast, target);

  console.log(codegen(ast));
};
