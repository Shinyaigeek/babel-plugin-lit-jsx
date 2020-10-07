import * as tsc from "typescript";

export const astParser = (entry: string, config: tsc.CompilerOptions) => {
  const program = tsc.createProgram([entry], config);
  const source = program.getSourceFile("");
  if(!source) {
    throw new Error("astParser: source is undefined")
  }
  return source
};
