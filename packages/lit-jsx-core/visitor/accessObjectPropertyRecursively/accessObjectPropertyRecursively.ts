import { isJSXMemberExpression, JSXMemberExpression } from "@babel/types";

export const accessObjectPropertyRecursively = (
  root: JSXMemberExpression,
  prev: string = ""
): string => {
  if (isJSXMemberExpression(root.object)) {
    return accessObjectPropertyRecursively(
      root.object,
      prev === "" ? root.property.name : root.property.name + "." + prev
    );
  }

  return root.property.name + "." + prev;
};
