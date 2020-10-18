import {
  identifier,
  isArrowFunctionExpression,
  isIdentifier,
  isJSXElement,
  isJSXExpressionContainer,
} from "@babel/types";
import { convertComponent2Function } from "../convertComponent2Function/convertComponent2Function";

//TODO 型付け
export const resolveAttrValue = (attrValue: any) => {
  if (isJSXExpressionContainer(attrValue)) {
    if (isIdentifier(attrValue.expression)) {
      return attrValue.expression;
    }

    if (isArrowFunctionExpression(attrValue.expression)) {
      return attrValue.expression;
    }

    if (isJSXElement(attrValue.expression)) {
      return attrValue.expression;
    }
  }

  return attrValue;
};
