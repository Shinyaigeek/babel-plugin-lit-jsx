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
import { convertJsxElementToTemplateLiteral } from "../convertJsxElementToTemplateLiteral/convertJsxElementToTemplateLiteral";

//TODO later

export const convertReturnedJSXElementToString = (
  nodePath: NodePath<ReturnStatement>
) => {
  // if (isJSXElement(nodePath.node.argument)) {
  //   nodePath.replaceWith(
  //     returnStatement(
  //     )
  //   );
  // }

  //@ts-ignore
  console.log(convertJsxElementToTemplateLiteral(nodePath.node.argument));
};
