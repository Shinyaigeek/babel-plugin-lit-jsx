import { NodePath } from "@babel/traverse";
import { isJSX, isJSXOpeningElement, JSXElement } from "@babel/types";

export const getTagNameFromElement = (element: JSXElement) => {
  //TODO :thinking_face:
  const tagName = isJSXOpeningElement(element)
    ? //@ts-ignore
      element.name.name
    : //@ts-ignore
      element.openingElement.name.name;

  if (!tagName) {
    throw new Error("jsx element is not jsx identifier");
  }

  return tagName as string;
};
