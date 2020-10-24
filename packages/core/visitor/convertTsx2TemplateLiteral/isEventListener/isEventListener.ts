import { NodePath } from "@babel/traverse";
import {
  isJSXElement,
  isJSXIdentifier,
  isJSXOpeningElement,
  JSXAttribute,
  JSXElement,
} from "@babel/types";
import { isUserDefinedComponent } from "../../isUserDefinedComponent/isUserDefinedComponent";

export const isEventListener = (attr: NodePath<JSXAttribute>) => {
  if (
    isJSXElement(attr.parentPath.node) ||
    isJSXOpeningElement(attr.parentPath.node)
  ) {
    if (isJSXIdentifier(attr.node.name)) {
      return attr.node.name.name[0] === "o" && attr.node.name.name[1] === "n";
    }

    throw new Error("jsx namespaced name is not support");
  }
};
