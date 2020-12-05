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
import { unsafeHTMLImportedFromLitHtmlDirective } from "../unsafeHTMLImportedFromLitHtmlDirective/unsafeHTMLImportedFromLitHtmlDirective";

export const insertUnsafeHTMLDirective = (rootNode: NodePath<Program>) => {
  if (!unsafeHTMLImportedFromLitHtmlDirective(rootNode)) {
    rootNode.unshiftContainer(
      "body",
      importDeclaration(
        [importSpecifier(identifier("unsafeHTML"), identifier("unsafeHTML"))],
        stringLiteral("lit-html/directives/unsafe-html.js")
      )
    );
  }
};
