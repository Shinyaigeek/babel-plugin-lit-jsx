import { NodePath } from "@babel/traverse";
import {
  isJSXElement,
  JSXElement,
  returnStatement,
  ReturnStatement,
  stringLiteral,
  templateElement,
  templateLiteral,
} from "@babel/types";
import { ConvertJsxElementToTemplateLiteral } from "../convertJsxElementToTemplateLiteral/convertJsxElementToTemplateLiteral";

//TODO later

export const convertReturnedJSXElementToString = (
  nodePath: NodePath<ReturnStatement>
) => {
  const Convert = ConvertJsxElementToTemplateLiteral(nodePath.node.argument);
  Convert.traverse();
  return Convert.render();
};
