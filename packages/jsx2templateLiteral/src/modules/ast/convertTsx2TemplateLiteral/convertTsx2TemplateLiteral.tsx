import traverse from "@babel/traverse";
import { File } from "@babel/types";
import { justifyJSXProps } from "./justifyJSXProps/justifyJSXProps";

export const convertTsx2TemplateLiteral = (ast: File) => {
  traverse(ast, {
    JSXAttribute(nodePath) {
      justifyJSXProps(nodePath);
    },
  });
};
