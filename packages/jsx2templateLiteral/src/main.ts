import { join } from "path";
import { astParser } from "./modules/ast/astParser/astParser";
import { codegen } from "./modules/ast/codegen/codegen";
import { convertTsx2TemplateLiteral } from "./modules/ast/convertTsx2TemplateLiteral/convertTsx2TemplateLiteral";

const ast = astParser(
  join(__dirname, "../../../examples/SimpleButton/App.tsx")
);

const result = convertTsx2TemplateLiteral(ast);

console.log(codegen(ast));
