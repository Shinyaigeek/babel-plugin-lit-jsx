import { TraverseOptions } from "@babel/traverse";
import { astParser } from "./astParser/astParser";
import { convertComponent2Function } from "./convertTsx2TemplateLiteral/convertComponent2Function/convertComponent2Function";
import { convertReturnedJSXElementToString } from "./convertTsx2TemplateLiteral/convertReturnedJSXElementToString/convertReturnedJSXElementToString";
import { justifyJSXProps } from "./convertTsx2TemplateLiteral/justifyJSXProps/justifyJSXProps";

export const visitor: TraverseOptions = {
  JSXAttribute(nodePath) {
    justifyJSXProps(nodePath);
  },
  JSXElement(nodePath) {
    convertComponent2Function(nodePath);
  },
  //   ImportDeclaration(nodePath) {
  //     const importedJsxPath = resolvePath(target, nodePath.node.source.value);
  //     if (importedJsxPath) {
  //       compileEachFile(importedJsxPath);
  //     }
  //   },
  ReturnStatement(nodePath) {
    convertReturnedJSXElementToString(nodePath);
  },
};

export { astParser };
