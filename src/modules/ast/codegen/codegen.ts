import * as tsc from "typescript";
import { fileWriter } from "../../file/fileWriter/fileWriter";

export const codegen = (source: tsc.SourceFile, printer: tsc.Printer, dist: string) => {
    const outputSource =  printer.printFile(source);
    return fileWriter(outputSource, dist);
}