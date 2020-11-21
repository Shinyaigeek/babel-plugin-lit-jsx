import { isImportDeclaration, Program } from "@babel/types";

export const getNodeOfImportedReact = (rootNode: Program) => {
  return rootNode.body.findIndex((child) => {
    if (isImportDeclaration(child)) {
      if (child.source.value === "react") {
        return true;
      }
    }
    return false;
  });
};
