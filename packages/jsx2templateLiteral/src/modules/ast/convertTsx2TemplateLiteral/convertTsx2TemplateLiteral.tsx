import traverse from "@babel/traverse";
import { File } from "@babel/types";
import { join } from "path";
import { resolvePath } from "../../file/resolvePath/resolvePath";
import { compileEachFile } from "../compileEachFile/compileEachFile";
import { convertComponent2Function } from "./convertComponent2Function/convertComponent2Function";
import { convertReturnedJSXElementToString } from "./convertReturnedJSXElementToString/convertReturnedJSXElementToString";
import { justifyJSXProps } from "./justifyJSXProps/justifyJSXProps";

export const convertTsx2TemplateLiteral = (ast: File, target: string) => {
  traverse(ast, {
    JSXAttribute(nodePath) {
      justifyJSXProps(nodePath);
    },
    JSXElement(nodePath) {
      convertComponent2Function(nodePath);
    },
    ImportDeclaration(nodePath) {
      compileEachFile(resolvePath(target, nodePath.node.source.value)!);
    },
  });

  traverse(ast, {
    ReturnStatement(nodePath) {
      convertReturnedJSXElementToString(nodePath);
      nodePath.skip();
    },
  });
};
