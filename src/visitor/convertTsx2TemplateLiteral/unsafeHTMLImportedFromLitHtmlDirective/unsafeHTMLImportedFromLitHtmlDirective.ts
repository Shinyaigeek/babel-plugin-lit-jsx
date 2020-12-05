import { NodePath } from "@babel/traverse";
import { isImportDeclaration, isImportSpecifier, Program } from "@babel/types";

export const unsafeHTMLImportedFromLitHtmlDirective = (
  rootNode: NodePath<Program>
) => {
  return !rootNode.node.body.every((child) => {
    if (isImportDeclaration(child)) {
      if (child.source.value === "lit-html/directives/unsafe-html.js") {
        if (
          child.specifiers.some((specify) => {
            if (isImportSpecifier(specify)) {
              return specify.imported.name === "unsafeHTML";
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
