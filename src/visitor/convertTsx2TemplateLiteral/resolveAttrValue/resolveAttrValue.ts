import {
  identifier,
  isArrowFunctionExpression,
  isIdentifier,
  isJSXElement,
  isJSXExpressionContainer,
  isMemberExpression,
} from "@babel/types";
import { accessObjectPropertyRecursively } from "../../accessObjectPropertyRecursively/accessObjectPropertyRecursively";
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

    if (isMemberExpression(attrValue.expression)) {
      return attrValue.expression;
    }
  }

  return attrValue;
};
