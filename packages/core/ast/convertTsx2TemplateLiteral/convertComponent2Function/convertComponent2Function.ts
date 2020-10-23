import { NodePath } from "@babel/traverse";
import {
  callExpression,
  Identifier,
  identifier,
  isJSXAttribute,
  isJSXIdentifier,
  isJSXSpreadAttribute,
  jsxElement,
  JSXElement,
  jsxExpressionContainer,
  JSXIdentifier,
  JSXSpreadAttribute,
  memberExpression,
  objectExpression,
  ObjectProperty,
  objectProperty,
  spreadElement,
  stringLiteral,
} from "@babel/types";
import { getTagNameFromElement } from "../../../../io/src/modules/util/getTagNameFromElement/getTagNameFromElement";
import { isUserDefinedComponent } from "../../isUserDefinedComponent/isUserDefinedComponent";
import { resolveAttrValue } from "../resolveAttrValue/resolveAttrValue";

export const convertComponent2Function = (nodePath: NodePath<JSXElement>) => {
  if (isUserDefinedComponent(nodePath.node)) {
    const tagName = getTagNameFromElement(nodePath.node);
    const spreadAttributes = nodePath.node.openingElement.attributes
      .map((attr) => (isJSXSpreadAttribute(attr) ? attr : undefined))
      .filter(
        (attr): attr is JSXSpreadAttribute => typeof attr !== "undefined"
      );
    nodePath.replaceWith(
      callExpression(identifier(tagName), [
        callExpression(
          memberExpression(identifier("Object"), identifier("assign")),
          [
            objectExpression(
              nodePath.node.openingElement.attributes
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
            ),
            ...spreadAttributes.map((attr) =>
              identifier((attr.argument as Identifier).name)
            ),
          ]
        ),
      ])
    );
  }
};

const h = [1, 2];

const i = [1, ...h.map((i) => i * 2)];
