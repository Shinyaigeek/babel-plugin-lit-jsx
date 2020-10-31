import { NodePath } from "@babel/traverse";
import {
  isJSXExpressionContainer,
  isObjectExpression,
  jsxAttribute,
  JSXAttribute,
  jsxIdentifier,
  ObjectExpression,
} from "@babel/types";
import { convertEventListener } from "../convertEventListener/convertEventListener";
import { convertStyle } from "../convertStyle/convertStyle";
import { getPropsKey } from "../getPropsKey/getPropsKey";

export const justifyStyle = (style: NodePath<JSXAttribute>) => {
  const key = getPropsKey(style);
  if (isJSXExpressionContainer(style.node.value)) {
    if (isObjectExpression(style.node.value.expression)) {
      style.replaceWith(
        jsxAttribute(
          jsxIdentifier(key),
          convertStyle(style.node.value.expression)
        )
      );
    } else {
      throw new Error("style object prop should be object expression");
    }
  } else {
    throw new Error("style object prop should be jsx expression container");
  }
};
