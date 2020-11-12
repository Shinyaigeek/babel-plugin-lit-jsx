import { NodePath } from "@babel/traverse";
import { CallExpression, isIdentifier, isMemberExpression } from "@babel/types";

export const isCreateElement = (nodePath: NodePath<CallExpression>) => {
  const { callee } = nodePath.node;
  if (isMemberExpression(callee)) {
    return (
      isIdentifier(callee.object) &&
      callee.object.name === "React" &&
      isIdentifier(callee.property) &&
      callee.property.name === "createElement"
    );
  }

  return false;
};
