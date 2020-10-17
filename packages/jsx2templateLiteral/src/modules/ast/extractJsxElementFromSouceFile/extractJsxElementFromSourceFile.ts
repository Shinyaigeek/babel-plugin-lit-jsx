import {
  isArrowFunctionExpression,
  isBlockStatement,
  isFunctionDeclaration,
  isReturnStatement,
  isVariableDeclaration,
} from "@babel/types";
import { astParser } from "../astParser/astParser";

export const extractJsxElementFromSouceFile = (target: string) => {
  const ast = astParser(target);

  const component = ast.program.body[0];

  // Arrow Func
  if (isVariableDeclaration(component)) {
    const arrow = component.declarations[0].init;
    if (isArrowFunctionExpression(arrow)) {
      if (isBlockStatement(arrow.body)) {
        const returnStatement = arrow.body.body[0];
        if (isReturnStatement(returnStatement)) {
          return returnStatement.argument;
        }
      }
    }
  }

  // Func
  if (isFunctionDeclaration(component)) {
    if (isBlockStatement(component.body)) {
      const returnStatement = component.body.body[0];
      if (isReturnStatement(returnStatement)) {
        return returnStatement.argument;
      }
    }
  }

  throw new Error("this is not jsx");
};
