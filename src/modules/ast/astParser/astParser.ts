import * as tsc from "typescript";

export const astParser = (source: string) => {
  return tsc.createSourceFile("", source, tsc.ScriptTarget.ES5, true);
};
