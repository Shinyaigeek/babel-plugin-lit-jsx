import {
  isCallExpression,
  isExpression,
  isJSXSpreadAttribute,
  isSpreadProperty,
  JSXElement,
} from "@babel/types";
import { resolveAttrValue } from "../resolveAttrValue/resolveAttrValue";

export const convertJsxElementToTemplateLiteral = (element: JSXElement) => {
  //@ts-ignore
  let tempQuery = `<${element.openingElement.name.name}`;
  let tempExpression = ``;

  const tempQueries = [];
  const tempExpressions = [];
  if (element.openingElement.attributes.length > 0) {
    element.openingElement.attributes.forEach((attr) => {
      if (isJSXSpreadAttribute(attr)) {
        //TODO
        throw new Error("spread props");
      }

      const value = resolveAttrValue(attr.value);

      if (isExpression(value)) {
          tempExpression += ``
      } else {
        tempQuery += ` ${attr.name.name}=${value.value}`;
      }
    });
  }

  return {
    queries: tempQueries,
    expressions: tempExpressions,
  };
};
