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
import { ConvertJSXElementToTemplateLiteral } from "../convertJsxElementToTemplateLiteral/convertJsxElementToTemplateLiteral";

//TODO later

export const convertReturnedJSXElementToString = (
  nodePath: NodePath<ReturnStatement>
) => {
  if (!isJSXElement(nodePath.node.argument)) {
    throw new Error("pure functional component should return jsx element");
  }

  const Convert = new ConvertJSXElementToTemplateLiteral(
    nodePath.node.argument
  );
  Convert.traverse();
  nodePath.replaceWith(Convert.render());
};
