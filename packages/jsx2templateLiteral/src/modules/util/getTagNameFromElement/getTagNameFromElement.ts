import { NodePath } from "@babel/traverse";
import { isJSX, isJSXOpeningElement, JSXElement } from "@babel/types";

export const getTagNameFromElement = (element: NodePath<JSXElement>) => {
  //TODO :thinking_face:
  const tagName = isJSXOpeningElement(element)
    ? //@ts-ignore
      element.node.name.name
    : //@ts-ignore
      element.node.openingElement.name.name;

  if (!tagName) {
    throw new Error("jsx element is not jsx identifier");
  }

  return tagName as string;
};
