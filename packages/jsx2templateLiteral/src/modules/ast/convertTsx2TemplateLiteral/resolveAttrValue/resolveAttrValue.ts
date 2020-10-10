import { identifier, isJSXExpressionContainer } from "@babel/types";

//TODO 型付け
export const resolveAttrValue = (attrValue: any) => {
  if (isJSXExpressionContainer(attrValue)) {
    //@ts-ignore
    return identifier(attrValue.expression.name);
  }

  return attrValue;
};
