import { NodePath } from "@babel/traverse";
import { isProgram, Program } from "@babel/types";

export const accessRootProgramRecursively = (
  entry: NodePath<any>
): NodePath<Program> => {
  const parentNode = entry.parentPath;
  if (isProgram(parentNode.node)) {
    // TODO type guardでparentNode.nodeがParentNodeだからparentNodeはNodePath<ParentNode>って推論できない
    return parentNode as NodePath<Program>;
  }

  return accessRootProgramRecursively(parentNode);
};
