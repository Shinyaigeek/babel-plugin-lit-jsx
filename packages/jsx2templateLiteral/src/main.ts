import { join } from "path";
import { compileEachFile } from "./modules/compileEachFile/compileEachFile";

compileEachFile(join(__dirname, "../../../examples/Children/App.tsx"));
compileEachFile(join(__dirname, "../../../examples/SimpleButton/App.tsx"));
