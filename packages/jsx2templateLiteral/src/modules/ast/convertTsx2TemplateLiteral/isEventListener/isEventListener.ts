import { NodePath } from "@babel/traverse";
import { JSXAttribute, JSXElement } from "@babel/types";
import { isUserDefinedComponent } from "../../../util/isUserDefinedComponent/isUserDefinedComponent";

export const isEventListener = (attr: NodePath<JSXAttribute>) => {
  if (
    attr.parentPath.node.type !== "JSXElement" &&
    attr.parentPath.node.type !== "JSXOpeningElement" &&
    typeof attr.node.name.name !== "string"
  ) {
    // TODO Why node.type infered as Node ?
    throw new Error("invalid node type");
  }
  return (
    !isUserDefinedComponent(attr.parentPath.node as JSXElement) &&
    (attr.node.name.name as string)[0] === "o" &&
    (attr.node.name.name as string)[1] === "n"
  );
};
