import { NodePath } from "@babel/traverse";
import { JSXElement } from "@babel/types";
import { getTagNameFromElement } from "../getTagNameFromElement/getTagNameFromElement";
import { htmltags } from "../htmltags/htmltags";

export const isUserDefinedComponent = (element: NodePath<JSXElement>) => {
  const tagName = getTagNameFromElement(element);
  return !htmltags.includes(tagName);
};
