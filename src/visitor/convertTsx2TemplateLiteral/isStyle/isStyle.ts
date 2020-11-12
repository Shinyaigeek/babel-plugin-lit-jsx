import { NodePath } from "@babel/traverse";
import {
  isJSXElement,
  isJSXIdentifier,
  isJSXOpeningElement,
  JSXAttribute,
} from "@babel/types";

export const isStyle = (attr: NodePath<JSXAttribute>) => {
  if (
    isJSXElement(attr.parentPath.node) ||
    isJSXOpeningElement(attr.parentPath.node)
  ) {
    if (isJSXIdentifier(attr.node.name)) {
      return attr.node.name.name === "style";
    }

    throw new Error("jsx namespaced name is not support");
  }
};
