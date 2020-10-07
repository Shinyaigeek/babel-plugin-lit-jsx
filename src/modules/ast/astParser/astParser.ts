import * as tsc from "typescript";

export const astParser = (entry: string, config: tsc.CompilerOptions) => {
  const program = tsc.createProgram([entry], config);
  const sources = program.getSourceFiles();
  const source = sources.find(sourceEl => sourceEl.fileName.substr(-5) !== ".d.ts");
  if(!source) {
    throw new Error("astParser: source is undefined")
  }

  return source
};
