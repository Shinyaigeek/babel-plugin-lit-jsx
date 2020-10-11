import { NodePath } from "@babel/traverse";
import { JSXAttribute } from "@babel/types";

export const getPropsKey = (attr: NodePath<JSXAttribute>) => {
  const key = attr.node.name.name;
  // TODO why key can be JSXIdentifier ?

  if (typeof key !== "string") {
    throw new Error("key is JSXIdentifier, invalid type");
  }

  return key;
};
