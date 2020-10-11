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
      return attrValue.expression.name;
    }

    if (isArrowFunctionExpression(attrValue.expression)) {
      return attrValue.expression.body;
    }
  }

  return attrValue;
};
