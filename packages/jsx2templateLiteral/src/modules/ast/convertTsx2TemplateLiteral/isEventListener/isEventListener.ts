import { NodePath } from "@babel/traverse";
import { JSXAttribute, JSXElement } from "@babel/types";
import { isUserDefinedComponent } from "../../../util/isUserDefinedComponent/isUserDefinedComponent";

export const isEventListener = (attr: NodePath<JSXAttribute>) => {
  if (attr.parentPath.node.type !== "JSXElement") {
    // TODO Why node.type infered as Node ?
    throw new Error("invalid node type");
  }
  return isUserDefinedComponent(attr.parentPath as NodePath<JSXElement>);
};
