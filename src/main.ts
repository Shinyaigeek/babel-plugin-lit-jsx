import { join } from "path";
import { astParser } from "./modules/ast/astParser/astParser";
import { fileReader } from "./modules/file/fileReader/fileReader";

import * as ts from "typescript"

const entryPointSource = fileReader(join(__dirname, "../examples/SimpleButton/App.tsx"))

console.log(astParser(entryPointSource))