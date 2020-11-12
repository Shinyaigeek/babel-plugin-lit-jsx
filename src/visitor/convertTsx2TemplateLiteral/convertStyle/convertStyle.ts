import {
  callExpression,
  identifier,
  jsxExpressionContainer,
  ObjectExpression,
} from "@babel/types";

// TODO type styles
export const convertStyle = (style: ObjectExpression) => {
  return jsxExpressionContainer(
    callExpression(identifier("styleMap"), [style])
  );
};
