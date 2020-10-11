import { NodePath } from "@babel/traverse";
import {
  callExpression,
  identifier,
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
  const tagName = getTagNameFromElement(nodePath);

  if (isUserDefinedComponent(tagName)) {
    nodePath.replaceWith(
      callExpression(identifier(tagName), [
        objectExpression(
          nodePath.node.openingElement.attributes.map((attr) => {
            return objectProperty(
              //@ts-ignore
              identifier((attr as JSXIdentifier).name.name),
              //@ts-ignore
              resolveAttrValue(attr.value)
            );
          })
        ),
      ])
    );
  }
};
