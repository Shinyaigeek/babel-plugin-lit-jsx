import { NodePath } from "@babel/traverse";
import {
  callExpression,
  identifier,
  isJSXAttribute,
  isJSXIdentifier,
  jsxElement,
  JSXElement,
  jsxExpressionContainer,
  JSXIdentifier,
  objectExpression,
  objectProperty,
  stringLiteral,
} from "@babel/types";
import { getTagNameFromElement } from "../../../util/getTagNameFromElement/getTagNameFromElement";
import { isUserDefinedComponent } from "../../../util/isUserDefinedComponent/isUserDefinedComponent";
import { resolveAttrValue } from "../resolveAttrValue/resolveAttrValue";

export const convertComponent2Function = (nodePath: NodePath<JSXElement>) => {
  if (isUserDefinedComponent(nodePath.node)) {
    const tagName = getTagNameFromElement(nodePath.node);
    nodePath.replaceWith(
      callExpression(identifier(tagName), [
        objectExpression(
          nodePath.node.openingElement.attributes.map((attr) => {
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
            } else {
              throw new Error("spread attribute is not supported");
            }
          })
        ),
      ])
    );
  }
};
