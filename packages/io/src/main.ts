import { join } from "path";
import { astParser } from "../../core/ast/astParser/astParser";
import { codegen } from "../../core/ast/codegen/codegen";
import { compileEachFile } from "../../core/ast/compileEachFile/compileEachFile";
import { convertTsx2TemplateLiteral } from "../../core/ast/convertTsx2TemplateLiteral/convertTsx2TemplateLiteral";

compileEachFile(join(__dirname, "../../../examples/Children/App.tsx"));
compileEachFile(join(__dirname, "../../../examples/SimpleButton/App.tsx"));
