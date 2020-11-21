import { NodePath } from "@babel/core";
import { Program } from "@babel/types";
import { getNodeOfImportedReact } from "../reactImportedFromReact/reactImportedFromReact";

export const removeReactImport = (rootNode: NodePath<Program>) => {
  const reactNodeIdx = getNodeOfImportedReact(rootNode.node);
  if (reactNodeIdx > -1) {
    const reactNodePath = rootNode.get(`body.${reactNodeIdx}`);
    if (!Array.isArray(reactNodePath)) {
      reactNodePath.remove();
    } else {
      reactNodePath.forEach((path) => path.remove());
    }
  }
};
