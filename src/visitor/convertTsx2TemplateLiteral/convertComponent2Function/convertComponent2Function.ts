import { NodePath } from "@babel/traverse";
import {
  callExpression,
  Identifier,
  identifier,
  isJSXAttribute,
  isJSXIdentifier,
  isJSXSpreadAttribute,
  jsxClosingFragment,
  jsxElement,
  JSXElement,
  jsxExpressionContainer,
  jsxFragment,
  JSXIdentifier,
  jsxOpeningFragment,
  JSXSpreadAttribute,
  memberExpression,
  objectExpression,
  ObjectProperty,
  objectProperty,
  spreadElement,
  stringLiteral,
} from "@babel/types";
import { getTagNameFromElement } from "../../getTagNameFromElement/getTagNameFromElement";
import { isUserDefinedComponent } from "../../isUserDefinedComponent/isUserDefinedComponent";
import { resolveAttrValue } from "../resolveAttrValue/resolveAttrValue";

export const convertComponent2Function = (node: JSXElement) => {
  if (isUserDefinedComponent(node)) {
    const tagName = getTagNameFromElement(node);
    const spreadAttributes = node.openingElement.attributes
      .map((attr) => (isJSXSpreadAttribute(attr) ? attr : undefined))
      .filter(
        (attr): attr is JSXSpreadAttribute => typeof attr !== "undefined"
      );
    const children = jsxFragment(
      jsxOpeningFragment(),
      jsxClosingFragment(),
      node.children
    );
    return callExpression(identifier(tagName), [
      callExpression(
        memberExpression(identifier("Object"), identifier("assign")),
        [
          objectExpression(
            node.openingElement.attributes
              .map((attr) => {
                //TODO
                if (isJSXAttribute(attr)) {
                  if (isJSXIdentifier(attr.name)) {
                    return objectProperty(
                      identifier(attr.name.name),
                      resolveAttrValue(attr.value)
                    );
                  } else {
                    throw new Error("jsx named space is not supported");
                  }
                }
              })
              .filter(
                (attr): attr is ObjectProperty => typeof attr !== "undefined"
              )
              .concat(objectProperty(identifier("children"), children))
          ),
          ...spreadAttributes.map((attr) =>
            identifier((attr.argument as Identifier).name)
          ),
        ]
      ),
    ]);
  }
};

const h = [1, 2];

const i = [1, ...h.map((i) => i * 2)];
