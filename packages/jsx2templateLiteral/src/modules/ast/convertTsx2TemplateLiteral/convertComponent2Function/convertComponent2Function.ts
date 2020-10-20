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
  memberExpression,
  objectExpression,
  ObjectProperty,
  objectProperty,
  spreadElement,
  stringLiteral,
} from "@babel/types";
import { getTagNameFromElement } from "../../../util/getTagNameFromElement/getTagNameFromElement";
import { isUserDefinedComponent } from "../../../util/isUserDefinedComponent/isUserDefinedComponent";
import { resolveAttrValue } from "../resolveAttrValue/resolveAttrValue";

export const convertComponent2Function = (nodePath: NodePath<JSXElement>) => {
  if (isUserDefinedComponent(nodePath.node)) {
    const tagName = getTagNameFromElement(nodePath.node);
    const spreadAttributes = nodePath.node.openingElement.attributes.find(
      (attr) => isJSXSpreadAttribute(attr)
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
            isJSXSpreadAttribute(spreadAttributes)
              ? identifier((spreadAttributes.argument as Identifier).name)
              : objectExpression([]),
          ]
        ),
      ])
    );
  }
};
