import { NodePath } from "@babel/traverse";
import {
  identifier,
  importDeclaration,
  importSpecifier,
  isImportDeclaration,
  isImportSpecifier,
  Program,
  stringLiteral,
} from "@babel/types";
import { htmlImportedFromLitHtml } from "../htmlImportedFromLitHtml/htmlImportedFromLitHtml";

export const insertHTMLImport = (rootNode: NodePath<Program>) => {
  if (!htmlImportedFromLitHtml(rootNode)) {
    rootNode.unshiftContainer(
      "body",
      importDeclaration(
        [importSpecifier(identifier("html"), identifier("html"))],
        stringLiteral("lit-html")
      )
    );
  }
};
