import { join } from "path";
import { astParser } from "../../core/visitor/astParser/astParser";
import { codegen } from "./modules/codegen/codegen";
import { compileEachFile } from "./modules/compileEachFile/compileEachFile";

compileEachFile(join(__dirname, "../../../examples/Children/App.tsx"));
compileEachFile(join(__dirname, "../../../examples/SimpleButton/App.tsx"));
