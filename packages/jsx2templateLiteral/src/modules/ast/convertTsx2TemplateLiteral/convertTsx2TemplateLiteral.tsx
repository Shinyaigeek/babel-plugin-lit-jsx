import traverse from "@babel/traverse";
import { File } from "@babel/types";
import { convertComponent2Function } from "./convertComponent2Function/convertComponent2Function";
import { justifyJSXProps } from "./justifyJSXProps/justifyJSXProps";

export const convertTsx2TemplateLiteral = (ast: File) => {
  traverse(ast, {
    JSXAttribute(nodePath) {
      justifyJSXProps(nodePath);
    },
    JSXElement(nodePath) {
      convertComponent2Function(nodePath);
    },
  });
};
