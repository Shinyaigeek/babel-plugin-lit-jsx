import { NodePath } from "@babel/traverse";
import { isImportDeclaration, isImportSpecifier, Program } from "@babel/types";

export const htmlImportedFromLitHtml = (rootNode: NodePath<Program>) => {
  return rootNode.node.body.every((child) => {
    if (isImportDeclaration(child)) {
      if (child.source.value === "lit-html") {
        if (
          child.specifiers.some((specify) => {
            if (isImportSpecifier(specify)) {
              return specify.imported.name === "html";
            }
          })
        ) {
          return false;
        }
      }
    }

    return true;
  });
};
