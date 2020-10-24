import { TraverseOptions } from "@babel/traverse";
import { convertComponent2Function } from "./convertTsx2TemplateLiteral/convertComponent2Function/convertComponent2Function";
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
};
