import { NodePath } from "@babel/traverse";
import { isProgram } from "@babel/types";

export const accessRootProgramRecursively = (
  entry: NodePath<any>
): NodePath<ParentNode> => {
  const parentNode = entry.parentPath;
  if (isProgram(parentNode.node)) {
    // TODO type guardでparentNode.nodeがParentNodeだからparentNodeはNodePath<ParentNode>って推論できない
    return (parentNode as any) as NodePath<ParentNode>;
  }

  return accessRootProgramRecursively(parentNode);
};
