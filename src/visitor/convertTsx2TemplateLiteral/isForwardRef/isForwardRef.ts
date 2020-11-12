import { NodePath } from "@babel/traverse";
import {
  CallExpression,
  isIdentifier,
  isMemberExpression,
  MemberExpression,
} from "@babel/types";

export const isForwardRef = (nodePath: NodePath<MemberExpression>) => {
  const callee = nodePath.node;
  return (
    isIdentifier(callee.object) &&
    callee.object.name === "React" &&
    isIdentifier(callee.property) &&
    callee.property.name === "forwardRef"
  );

  return false;
};
