import {
  identifier,
  isArrowFunctionExpression,
  isIdentifier,
  isJSXExpressionContainer,
} from "@babel/types";

//TODO 型付け
export const resolveAttrValue = (attrValue: any) => {
  if (isJSXExpressionContainer(attrValue)) {
    if (isIdentifier(attrValue.expression)) {
      return attrValue.expression;
    }

    if (isArrowFunctionExpression(attrValue.expression)) {
      return attrValue.expression;
    }
  }

  return attrValue;
};
