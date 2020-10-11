import { NodePath } from "@babel/traverse";
import { JSXElement } from "@babel/types";

export const getTagNameFromElement = (element: NodePath<JSXElement>) => {
  // TODO fix above
  const tagName =
    element.node.openingElement.name.type === "JSXIdentifier" &&
    element.node.openingElement.name.name;

  if (!tagName) {
    throw new Error("jsx element is not jsx identifier");
  }

  return tagName;
};
