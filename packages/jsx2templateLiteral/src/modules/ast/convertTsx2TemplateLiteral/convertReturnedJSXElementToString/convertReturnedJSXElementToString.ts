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
  if (isJSXElement(nodePath.node.argument)) {
    const Convert = new ConvertJSXElementToTemplateLiteral(
      nodePath.node.argument
    );
    Convert.traverse();
    nodePath.replaceWith(returnStatement(Convert.render()));
  } else {
    console.warn("pure functional component should return jsx element");
  }
};
