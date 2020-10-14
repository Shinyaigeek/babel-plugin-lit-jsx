import { join } from "path";
import { astParser } from "./modules/ast/astParser/astParser";
import { codegen } from "./modules/ast/codegen/codegen";
import { compileEachFile } from "./modules/ast/compileEachFile/compileEachFile";
import { convertTsx2TemplateLiteral } from "./modules/ast/convertTsx2TemplateLiteral/convertTsx2TemplateLiteral";

compileEachFile(join(__dirname, "../../../examples/SimpleButton/App.tsx"));
