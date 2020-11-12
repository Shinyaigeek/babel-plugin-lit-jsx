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

  if (prev === "") {
    return root.object.name + "." + root.property.name;
  }

  return root.object.name + "." + root.property.name + "." + prev;
};
