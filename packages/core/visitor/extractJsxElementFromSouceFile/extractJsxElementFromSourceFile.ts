import {
  isArrowFunctionExpression,
  isBlockStatement,
  isExportDefaultDeclaration,
  isExportNamedDeclaration,
  isFunctionDeclaration,
  isJSXElement,
  isJSXFragment,
  isReturnStatement,
  isVariableDeclaration,
} from "@babel/types";
import { astParser } from "../../../jsx2templateLiteral/src/modules/astParser/astParser";

export const extractJsxElementFromSouceFile = (target: string) => {
  const ast = astParser(target);

  return ast.program.body
    .map((program) => {
      if (
        !isExportNamedDeclaration(program) &&
        !isExportDefaultDeclaration(program)
      ) {
        return undefined;
      }

      const component = program.declaration;

      // Arrow Func
      if (isVariableDeclaration(component)) {
        const arrow = component.declarations[0].init;
        if (isArrowFunctionExpression(arrow)) {
          if (isBlockStatement(arrow.body)) {
            const returnStatement = arrow.body.body[0];
            if (isReturnStatement(returnStatement)) {
              if (
                isJSXElement(returnStatement.argument) ||
                isJSXFragment(returnStatement.argument)
              ) {
                return returnStatement.argument;
              }
            }
          }
          if (isJSXElement(arrow.body) || isJSXFragment(arrow.body)) {
            return arrow.body;
          }
        }
      }

      // Func
      if (isFunctionDeclaration(component)) {
        if (isBlockStatement(component.body)) {
          const returnStatement = component.body.body[0];
          if (isReturnStatement(returnStatement)) {
            if (
              isJSXElement(returnStatement.argument) ||
              isJSXFragment(returnStatement.argument)
            ) {
              return returnStatement.argument;
            }
          }
        }
      }

      return undefined;
    })
    .filter((res) => typeof res !== "undefined");
};
