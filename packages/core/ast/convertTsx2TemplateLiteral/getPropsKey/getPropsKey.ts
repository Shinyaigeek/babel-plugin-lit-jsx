import { NodePath } from "@babel/traverse";
import {
  isJSXIdentifier,
  isJSXNamespacedName,
  JSXAttribute,
} from "@babel/types";

export const getPropsKey = (attrNode: NodePath<JSXAttribute>) => {
  const attr = attrNode.node.name;

  if (isJSXIdentifier(attr)) {
    return attr.name;
  }

  // JSXNamespacedName
  throw new Error("lit-jsx doesn't support namespaced attribute key");
};
