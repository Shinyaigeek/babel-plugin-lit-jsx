import { NodePath } from "@babel/traverse";
import {
  isJSX,
  isJSXIdentifier,
  isJSXNamespacedName,
  isJSXOpeningElement,
  JSXElement,
} from "@babel/types";
import { accessObjectPropertyRecursively } from "../accessObjectPropertyRecursively/accessObjectPropertyRecursively";

export const getTagNameFromElement = (element: JSXElement) => {
  if (isJSXNamespacedName(element.openingElement.name)) {
    throw new Error("jsx namespaced name is not supported");
  }

  if (isJSXIdentifier(element.openingElement.name)) {
    return element.openingElement.name.name;
  } else {
    return accessObjectPropertyRecursively(element.openingElement.name);
  }
};
